import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { EmployeeBasicInfo } from "@/utilities/selectors";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { full_name, department, date_of_birth, email, password } = body;

    // Hash employee password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating new employee
    const registeredEmployee = await prisma.employee.create({
      data: {
        full_name,
        department,
        date_of_birth: new Date(date_of_birth).toISOString(),
        email,
        password: hashedPassword,
      },
      select: EmployeeBasicInfo,
    });

    return NextResponse.json({ data: registeredEmployee, success: true });
  } catch (error: any) {
    return NextResponse.json(
      {
        error,
        message: error?.message || "Something went wrong in signing up",
        success: false,
      },
      { status: 400 }
    );
  }
}
