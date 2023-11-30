import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { EmployeeBasicInfo } from "@/types/employee";
import { EmployeeBasicInfo as EmployeeBasicInfoSelector } from "./selectors";

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
