import { Employee } from "@prisma/client";

export type EmployeeBasicInfo = Omit<Employee, "password" | "shifts">;
