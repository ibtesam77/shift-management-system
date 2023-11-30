import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import prisma from "@/lib/prisma";
import { getLoggedInEmployee } from "@/utilities/helpers";
import { isHR } from "@/utilities/permissions";
import { LocationDetails } from "@/utilities/selectors";

// ======================== Get Location Details =========================
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const locationID = params.id;

    const isHREmployee = await isHR(request);
    if (!isHREmployee) throw new Error("Only HR can view location details");

    // Fetch location details
    const locationDetails = await prisma.location.findFirstOrThrow({
      where: {
        id: +locationID,
      },
      select: LocationDetails,
    });

    return NextResponse.json({ data: locationDetails, success: true });
  } catch (error: any) {
    return NextResponse.json(
      {
        error,
        message:
          error?.message || "Something went wrong in fetching location details",
        success: false,
      },
      { status: 400 }
    );
  }
}

// ======================== Update Exisiting Location =========================
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const locationID = params.id;
    const body = await request.json();

    const isHREmployee = await isHR(request);
    if (!isHREmployee) throw new Error("Only HR can update locations");

    const payload = {
      name: body.name || undefined,
    };

    // Update location
    const updatedLocation = await prisma.location.update({
      where: { id: +locationID },
      data: payload,
      select: LocationDetails,
    });

    return NextResponse.json({ data: updatedLocation, success: true });
  } catch (error: any) {
    return NextResponse.json(
      {
        error,
        message: error?.message || "Something went wrong in updating location",
        success: false,
      },
      { status: 400 }
    );
  }
}

// ======================== Delete Exisiting Location =========================
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const locationID = params.id;

    const isHREmployee = await isHR(request);
    if (!isHREmployee) throw new Error("Only HR can delete locations");

    // Delete location
    const location = await prisma.location.delete({
      where: { id: +locationID },
    });

    return NextResponse.json({ data: location, success: true });
  } catch (error: any) {
    return NextResponse.json(
      {
        error,
        message: error?.message || "Something went wrong in deleting location",
        success: false,
      },
      { status: 400 }
    );
  }
}
