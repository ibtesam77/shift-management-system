import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { SECRET_KEY } from "@/utilities/environment";

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: "/api/:function*",
};

export async function middleware(request: NextRequest) {
  // Private Routes (All routes except auth routes)
  if (!request.nextUrl.pathname.includes("/auth")) {
    try {
      const token = request.cookies.get("token")?.value;

      // If token is not found in cookies
      if (!token) throw new Error("No Token Found");

      // Verifying JWT Token
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(SECRET_KEY)
      );
      const employeeID = payload.id as number;

      // Set logged in employee id in header
      const response = NextResponse.next();
      response.headers.set("employee-id", employeeID.toString());

      return response;
    } catch (error: any) {
      return NextResponse.json(
        {
          error,
          message: error?.message || "You are not authorized",
          success: false,
        },
        { status: 401 }
      );
    }
  }
}
