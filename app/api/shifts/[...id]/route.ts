import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import prisma from "@/lib/prisma";
import { getLoggedInEmployee } from "@/utilities/helpers";
import { isHR } from "@/utilities/permissions";
import { EmployeeShiftDetails } from "@/utilities/selectors";

// ======================== Get Shift Details =========================
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const shiftID = params.id;

    const loggedInEmployee = await getLoggedInEmployee(request);

    // If Employee is "HR" then show target shift else logged in employee can view his shift only
    const targetEmployeeShift = await prisma.employeeShift.findFirstOrThrow({
      where: {
        id: +shiftID,
        ...(loggedInEmployee.department === "HR"
          ? {}
          : { employee_id: loggedInEmployee.id }),
      },
      select: EmployeeShiftDetails,
    });

    return NextResponse.json({ data: targetEmployeeShift, success: true });
  } catch (error: any) {
    return NextResponse.json(
      {
        error,
        message:
          error?.message || "Something went wrong in fetching employee details",
        success: false,
      },
      { status: 400 }
    );
  }
}

// ======================== Update Exisiting Shift =========================
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const shiftID = params.id;
    const body = await request.json();

    const isHREmployee = await isHR(request);
    if (!isHREmployee) throw new Error("Only HR can update shifts");

    const payload = {
      employee_id: body.employee_id || undefined,
      location_id: body.location_id || undefined,
      date: body.date ? dayjs(body.date).toDate() : undefined,
      from_time: body.from_time
        ? dayjs(`${dayjs().format("YYYY-MM-DD")} ${body.from_time}`).toDate()
        : undefined,
      to_time: body.to_time
        ? dayjs(`${dayjs().format("YYYY-MM-DD")} ${body.to_time}`).toDate()
        : undefined,
    };

    // Update employee shift
    const updatedShift = await prisma.employeeShift.update({
      where: { id: +shiftID },
      data: payload,
      select: EmployeeShiftDetails,
    });

    return NextResponse.json({ data: updatedShift, success: true });
  } catch (error: any) {
    return NextResponse.json(
      {
        error,
        message: error?.message || "Something went wrong in updating shift",
        success: false,
      },
      { status: 400 }
    );
  }
}

// ======================== Delete Exisiting Shift =========================
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const shiftID = params.id;

    const isHREmployee = await isHR(request);
    if (!isHREmployee) throw new Error("Only HR can delete shifts");

    // Delete employee shift
    const deletedShift = await prisma.employeeShift.delete({
      where: { id: +shiftID },
    });

    return NextResponse.json({ data: deletedShift, success: true });
  } catch (error: any) {
    return NextResponse.json(
      {
        error,
        message: error?.message || "Something went wrong in deleting shift",
        success: false,
      },
      { status: 400 }
    );
  }
}
