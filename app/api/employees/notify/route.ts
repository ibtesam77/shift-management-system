import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { EmployeeShiftDetails } from "@/utilities/selectors";

export async function GET(request: NextRequest) {
  try {
    // Fetch all shifts for today
    const todayShifts = await prisma.employeeShift.findMany({
      where: { date: new Date() },
      select: EmployeeShiftDetails,
    });

    return NextResponse.json({ data: todayShifts, success: true });
  } catch (error: any) {
    return NextResponse.json(
      {
        error,
        message:
          error?.message ||
          "Something went wrong in scheduling employees shifts notification",
        success: false,
      },
      { status: 400 }
    );
  }
}
