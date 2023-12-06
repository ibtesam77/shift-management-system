"use client";

import { useMemo } from "react";
import useSWR from "swr";
import DataTable from "@/components/organisms/table/data/DataTable";
import { EmployeeBasicInfo } from "@/types/employee";
import { fetcher } from "@/utilities/helpers";

interface EmployeeTableData extends Omit<EmployeeBasicInfo, "date_of_birth"> {}

interface EmployeeTableHeading {
  label: string;
  key: keyof EmployeeTableData;
}

const Employees = () => {
  const { isLoading, data: employees = [] } = useSWR("/api/employees", fetcher);

  const tableHeadings: EmployeeTableHeading[] = [
    {
      label: "Name",
      key: "full_name",
    },
    {
      label: "Department",
      key: "department",
    },
    {
      label: "Email",
      key: "email",
    },
  ];

  const modifiedEmployees = useMemo(
    () =>
      (employees as EmployeeTableData[]).map(
        ({ id, full_name, department, email }) => ({
          id,
          full_name,
          department,
          email,
        })
      ),
    [employees]
  );

  return (
    <div>
      <DataTable<EmployeeTableData>
        headings={tableHeadings}
        data={modifiedEmployees}
        isLoading={isLoading}
        noRecordsMessage="No Employees Found!!!"
      />
    </div>
  );
};

export default Employees;
