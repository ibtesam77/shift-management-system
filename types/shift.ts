import { EmployeeShift } from "@prisma/client";
import { EmployeeBasicInfo } from "./employee";
import { LocationDetails } from "./location";

export interface EmployeeShiftDetails extends EmployeeShift {
  employee_details: EmployeeBasicInfo;
  location_details: LocationDetails;
}
