import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import prisma from "@/lib/prisma";
import { isHR } from "@/utilities/permissions";
import { LocationDetails } from "@/utilities/selectors";

// ======================== Get All Locations =========================
export async function GET(request: NextRequest) {
  try {
    const isHREmployee = await isHR(request);
    if (!isHREmployee) throw new Error("Only HR can view all locations");

    // Fetch all locations
    const locations = await prisma.location.findMany({
      select: LocationDetails,
    });

    return NextResponse.json({ data: locations, success: true });
  } catch (error: any) {
    return NextResponse.json(
      {
        error,
        message: error?.message || "Something went wrong in fetching locations",
        success: false,
      },
      { status: 400 }
    );
  }
}

// ======================== Create New Location =========================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    const isHREmployee = await isHR(request);
    if (!isHREmployee) throw new Error("Only HR can add new location");

    // Add new location
    const addedLocation = await prisma.location.create({
      data: {
        name,
      },
      select: LocationDetails,
    });

    return NextResponse.json({ data: addedLocation, success: true });
  } catch (error: any) {
    return NextResponse.json(
      {
        error,
        message:
          error?.message || "Something went wrong in adding new location",
        success: false,
      },
      { status: 400 }
    );
  }
}
