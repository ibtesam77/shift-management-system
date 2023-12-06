import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { convertShiftsToCSV, sendShiftsToEmail } from "@/utilities/helpers";
import { EmployeeShiftDetails } from "@/utilities/selectors";

export async function GET(request: NextRequest) {
  try {
    // Fetch today shifts
    const todayShifts = await prisma.employeeShift.findMany({
      where: { date: new Date() },
      select: EmployeeShiftDetails,
    });

    // If no shifts are found for today
    if (todayShifts.length <= 0)
      return NextResponse.json({
        data: { message: "No shifts found for today" },
        success: true,
      });

    const shiftsAttachment = convertShiftsToCSV(todayShifts);

    // Send email with attachment (containing target shifts)
    await sendShiftsToEmail(process.env.MANAGER_EMAIL!, [
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
        message:
          error?.message || "Something went wrong in sending daily report",
        success: false,
      },
      { status: 400 }
    );
  }
}
