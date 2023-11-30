import { NextRequest, NextResponse } from "next/server";
import { getLoggedInEmployee } from "@/utilities/helpers";

export async function GET(request: NextRequest) {
  try {
    // Fetch logged in employee
    const loggedInEmployee = await getLoggedInEmployee(request);

    return NextResponse.json({ data: loggedInEmployee, success: true });
  } catch (error: any) {
    return NextResponse.json(
      {
        error,
        message:
          error?.message ||
          "Something went wrong in fetching my profile details",
        success: false,
      },
      { status: 400 }
    );
  }
}
