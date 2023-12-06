"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import DataTable from "@/components/organisms/table/data/DataTable";
import dayjs from "dayjs";
import { EmployeeShiftDetails } from "@/types/shift";
import { fetcher } from "@/utilities/helpers";
import ShiftFilterForm from "@/components/organisms/form/ShiftFilterForm";
import SimpleButton from "@/components/molecules/button/Simple";
import SimpleModal from "@/components/molecules/modal/FormModal";
import { TextInput } from "flowbite-react";
import EmailForm from "@/components/organisms/form/EmailForm";

interface ShiftTableData {
  id: number;
  employee_name: string;
  date: string;
  timings: string;
  location_name: string;
}

interface ShiftTableHeading {
  label: string;
  key: keyof ShiftTableData;
}

const Shifts = () => {
  const searchParams = useSearchParams();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState<boolean>(false);

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  // Preparing filters
  const filters = new URLSearchParams({
    ...(from ? { from: dayjs(from).format("YYYY-MM-DD") } : {}),
    ...(to ? { to: dayjs(to).format("YYYY-MM-DD") } : {}),
  }).toString();

  const { isLoading, data: shifts = [] } = useSWR(
    `/api/shifts?${filters}`,
    fetcher
  );

  const tableHeadings: ShiftTableHeading[] = [
    {
      label: "Employee Name",
      key: "employee_name",
    },
    {
      label: "Date",
      key: "date",
    },
    {
      label: "Timings",
      key: "timings",
    },
    {
      label: "Location",
      key: "location_name",
    },
  ];

  const modifiedShifts = useMemo(
    () =>
      (shifts as EmployeeShiftDetails[]).map((shift) => ({
        id: shift.id,
        employee_name: shift.employee_details.full_name,
        date: dayjs(shift.date).format("DD MMM YYYY"),
        timings:
          dayjs(shift.from_time).format("h:MM A") +
          " - " +
          dayjs(shift.to_time).format("h:MM A"),
        location_name: shift.location_details.name,
      })),
    [shifts]
  );

  const toggleEmailModal = () => {
    setIsEmailModalOpen((prevState) => !prevState);
  };

  return (
    <div>
      {/* Modal For Prompting Report Email */}
      <SimpleModal
        isOpen={isEmailModalOpen}
        onClose={toggleEmailModal}
        heading="Email Address"
      >
        <EmailForm
          shifts={shifts as EmployeeShiftDetails[]}
          onClose={toggleEmailModal}
        />
      </SimpleModal>

      {/* Filter Form for Shifts */}
      <div className="flex">
        <ShiftFilterForm />
        <SimpleButton
          className="h-[40px] w-[200px] bg-gray-300 hover:bg-gray-400"
          type="button"
          onClick={toggleEmailModal}
        >
          Generate Report
        </SimpleButton>
      </div>

      {/* Datatable for shifts */}
      <DataTable<ShiftTableData>
        headings={tableHeadings}
        data={modifiedShifts}
        isLoading={isLoading}
        noRecordsMessage="No Shifts Found!!!"
      />
    </div>
  );
};

export default Shifts;
