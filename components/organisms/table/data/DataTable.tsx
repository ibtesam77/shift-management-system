"use client";

import { Fragment } from "react";
import SimpleSpinner from "@/components/atoms/spinners/simple";
import { TableHeading } from "@/types/table";
import { Checkbox, Table } from "flowbite-react";

interface DataTableProps<DataType> {
  headings: TableHeading[];
  data: DataType[];
  isLoading?: boolean;
  noRecordsMessage?: string;
}

const DataTable = <DataType,>(props: DataTableProps<DataType>) => {
  const {
    isLoading = false,
    headings,
    data,
    noRecordsMessage = "No Records Found!!!",
  } = props;

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          {headings.map((item) => (
            <Table.HeadCell key={item.key}>{item.label}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {isLoading ? (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell colSpan={headings.length + 1}>
                <SimpleSpinner className="mx-auto" />
              </Table.Cell>
            </Table.Row>
          ) : (
            <Fragment>
              {data.length > 0 ? (
                data.map((record: any) => (
                  <Table.Row
                    key={record.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    {headings.map((heading) => (
                      <Table.Cell key={heading.key}>
                        {record[heading.key]}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))
              ) : (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell
                    className="text-center"
                    colSpan={headings.length + 1}
                  >
                    {noRecordsMessage}
                  </Table.Cell>
                </Table.Row>
              )}
            </Fragment>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default DataTable;
