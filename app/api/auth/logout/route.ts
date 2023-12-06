import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();

    cookieStore.delete("token");

    return NextResponse.json({
      data: { message: "Logged out successfully" },
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error,
        message: error?.message || "Something went wrong in logging out",
        success: false,
      },
      { status: 400 }
    );
  }
}
