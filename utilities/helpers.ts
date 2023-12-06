import { NextRequest } from "next/server";
import dayjs from "dayjs";
import { mkConfig, generateCsv, asString } from "export-to-csv/output/index";
import { writeFile } from "node:fs";
import { Buffer } from "node:buffer";
import prisma from "@/lib/prisma";
import nodemailTransport from "@/lib/nodemailer";
import { EmployeeBasicInfo } from "@/types/employee";
import Mail from "nodemailer/lib/mailer";
import { EmployeeBasicInfo as EmployeeBasicInfoSelector } from "./selectors";
import { EmployeeShiftDetails } from "@/types/shift";

export const getLoggedInEmployee = (
  request: NextRequest
): Promise<EmployeeBasicInfo> => {
  return new Promise(async (resolve, reject) => {
    try {
      const loggedInEmployeeID = request.headers.get("employee-id") as string;

      const loggedInEmployee = await prisma.employee.findFirstOrThrow({
        where: { id: +loggedInEmployeeID },
        select: EmployeeBasicInfoSelector,
      });

      resolve(loggedInEmployee);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetcher = async <SuccessDataType>(
  ...args: Parameters<typeof fetch>
): Promise<SuccessDataType> => {
  const res = await fetch(...args);
  const jsonRespone = await res.json();
  return jsonRespone.data;
};

export const convertShiftsToCSV = (shifts: EmployeeShiftDetails[]) => {
  const csvConfig = mkConfig({ useKeysAsHeaders: true });

  const shiftsData = shifts.map((shift) => ({
    "Employee Name": shift.employee_details.full_name,
    Date: dayjs(shift.date).format("DD MMM YYYY"),
    Timings:
      dayjs(shift.from_time).format("h:MM A") +
      " - " +
      dayjs(shift.to_time).format("h:MM A"),
    Location: shift.location_details.name,
  }));

  // Converts your Array<Object> to a CsvOutput string based on the configs
  const csv = generateCsv(csvConfig)(shiftsData);
  const filename = `${csvConfig.filename}.csv`;
  const csvBuffer = Buffer.from(asString(csv));

  return {
    filename,
    buffer: csvBuffer,
  };
};

export const sendShiftsToEmail = async (
  email: string,
  attachments: Mail.Attachment[]
) => {
  const info = await nodemailTransport
    .sendMail({
      from: `"Shift Management System" <${process.env.EMAIL_HOST_USER}>`,
      to: email,
      subject: "Shifts Report",
      text: "Hello, Shifts report is attached",
      attachments,
    })
    .catch(console.error);

  return info ? info.messageId : null;
};
