import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import prisma from "@/lib/prisma";
import {
  JWT_TOKEN_EXPIRY,
  NODE_ENV,
  SECRET_KEY,
} from "@/utilities/environment";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Fetch target employee
    const targetEmployee = await prisma.employee.findFirstOrThrow({
      where: { email },
    });

    // Compare employee password
    const isPasswordMatched = await bcrypt.compare(
      password,
      targetEmployee.password
    );
    if (!isPasswordMatched) throw new Error("Password mismatch");

    const token = await new SignJWT({ id: targetEmployee.id })
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime(JWT_TOKEN_EXPIRY)
      .sign(new TextEncoder().encode(SECRET_KEY));

    // Set token in cookies
    const response = NextResponse.json({ data: { token, success: true } });
    response.cookies.set({
      name: "token",
      value: token,
      path: "/",
      httpOnly: true,
      secure: NODE_ENV === "production",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error,
        message: "Invalid credentials",
        success: false,
      },
      { status: 400 }
    );
  }
}
