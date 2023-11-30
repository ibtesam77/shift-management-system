import { Prisma } from "@prisma/client";

export const EmployeeBasicInfo: Prisma.EmployeeSelect = {
  id: true,
  full_name: true,
  date_of_birth: true,
  department: true,
  email: true,
};

export const LocationDetails: Prisma.LocationSelect = {
  id: true,
  name: true,
};

export const EmployeeShiftDetails: Prisma.EmployeeShiftSelect = {
  id: true,
  date: true,
  from_time: true,
  to_time: true,
  employee_details: {
    select: EmployeeBasicInfo,
  },
  location_details: {
    select: LocationDetails,
  },
};
