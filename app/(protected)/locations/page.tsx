"use client";

import useSWR from "swr";
import DataTable from "@/components/organisms/table/data/DataTable";
import { LocationDetails } from "@/types/location";
import { fetcher } from "@/utilities/helpers";

interface LocationTableHeading {
  label: string;
  key: keyof LocationDetails;
}

const Locations = () => {
  const { isLoading, data: locations = [] } = useSWR("/api/locations", fetcher);

  const tableHeadings: LocationTableHeading[] = [
    {
      label: "Name",
      key: "name",
    },
  ];

  return (
    <div>
      <DataTable<LocationDetails>
        headings={tableHeadings}
        data={locations as LocationDetails[]}
        isLoading={isLoading}
        noRecordsMessage="No Locations Found!!!"
      />
    </div>
  );
};

export default Locations;
