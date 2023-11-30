import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getLoggedInEmployee } from "@/utilities/helpers";
import { EmployeeBasicInfo } from "@/utilities/selectors";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const employeeID = params.id;

    // Fetch logged in employee
    const loggedInEmployee = await getLoggedInEmployee(request);

    if (loggedInEmployee.department !== "HR")
      throw new Error("You are not authroized to fetch employees information");

    // Fetch target employee
    const targetEmployee = await prisma.employee.findFirstOrThrow({
      where: { id: +employeeID },
      select: EmployeeBasicInfo,
    });

    return NextResponse.json({ data: targetEmployee, success: true });
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
