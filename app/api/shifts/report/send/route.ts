import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isHR } from "@/utilities/permissions";
import { convertShiftsToCSV, sendShiftsToEmail } from "@/utilities/helpers";
import { EmployeeShiftDetails } from "@/utilities/selectors";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, shifts = [] } = body;

    const isHREmployee = await isHR(request);
    if (!isHREmployee) throw new Error("Only HR can send emails");

    // Fetch target shifts
    const targetShifts = await prisma.employeeShift.findMany({
      where: { id: { in: shifts } },
      select: EmployeeShiftDetails,
    });

    const shiftsAttachment = convertShiftsToCSV(targetShifts);

    // Send email with attachment (containing target shifts)
    await sendShiftsToEmail(email, [
      { filename: "Shifts Report.csv", content: shiftsAttachment.buffer },
    ]);

    return NextResponse.json({
      data: { message: "Email sent successfully" },
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error,
        message: error?.message || "Something went wrong in creating new shift",
        success: false,
      },
      { status: 400 }
    );
  }
}
