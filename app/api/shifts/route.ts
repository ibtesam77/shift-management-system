import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import prisma from "@/lib/prisma";
import { getLoggedInEmployee } from "@/utilities/helpers";
import { isHR } from "@/utilities/permissions";
import { EmployeeShiftDetails } from "@/utilities/selectors";

// ======================== Get All Shifts =========================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const from_date = searchParams.get("from");
    const to_date = searchParams.get("to");

    // Fetch logged in employee
    const loggedInEmployee = await getLoggedInEmployee(request);

    // If Employee is "HR" then show all shifts else show his own shifts
    const employeeShifts = await prisma.employeeShift.findMany({
      where: {
        date: {
          gte: from_date ? new Date(from_date) : undefined,
          lte: to_date ? new Date(to_date) : undefined,
        },
        ...(loggedInEmployee.department === "HR"
          ? {}
          : { id: loggedInEmployee.id }),
      },
      select: EmployeeShiftDetails,
    });

    return NextResponse.json({ data: employeeShifts, success: true });
  } catch (error: any) {
    return NextResponse.json(
      {
        error,
        message:
          error?.message || "Something went wrong in fetching employee shifts",
        success: false,
      },
      { status: 400 }
    );
  }
}

// ======================== Create New Shift =========================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { employee_id, location_id, date, from_time, to_time } = body;

    const isHREmployee = await isHR(request);
    if (!isHREmployee) throw new Error("Only HR can create new shifts");

    // Creating new shift for employee
    const createdShift = await prisma.employeeShift.create({
      data: {
        employee_id,
        location_id,
        date: dayjs(date).toDate(),
        from_time: dayjs(
          `${dayjs().format("YYYY-MM-DD")} ${from_time}`
        ).toDate(),
        to_time: dayjs(`${dayjs().format("YYYY-MM-DD")} ${to_time}`).toDate(),
      },
      select: EmployeeShiftDetails,
    });

    return NextResponse.json({ data: createdShift, success: true });
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
