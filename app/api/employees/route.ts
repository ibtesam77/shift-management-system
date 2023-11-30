import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getLoggedInEmployee } from "@/utilities/helpers";

export async function GET(request: NextRequest) {
  try {
    // Fetch logged in employee
    const loggedInEmployee = await getLoggedInEmployee(request);

    if (loggedInEmployee.department !== "HR")
      throw new Error("You are not authroized to fetch employees information");

    // Fetch all employees
    const employees = await prisma.employee.findMany();

    return NextResponse.json({ data: employees, success: true });
  } catch (error: any) {
    return NextResponse.json(
      {
        error,
        message: error?.message || "Something went wrong in fetching employees",
        success: false,
      },
      { status: 400 }
    );
  }
}
