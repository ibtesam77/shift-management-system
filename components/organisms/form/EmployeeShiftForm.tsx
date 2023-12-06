import { useMemo } from "react";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";
import useSWR from "swr";
import axios from "axios";
import Field from "@/components/molecules/form/Field";
import SimpleButton from "@/components/molecules/button/Simple";
import { fetcher } from "@/utilities/helpers";
import { EmployeeBasicInfo } from "@/types/employee";
import { LocationDetails } from "@/types/location";

interface EmployeeShiftFormValues {
  employee_id: number;
  location_id: number;
  date: string;
  from_time: string;
  to_time: string;
}

const EmployeeShiftForm = () => {
  const router = useRouter();

  const { data: employees = [] } = useSWR("/api/employees", fetcher);
  const { data: locations = [] } = useSWR("/api/locations", fetcher);

  const employeesOptions = useMemo(
    () =>
      (employees as EmployeeBasicInfo[]).map((employee) => ({
        label: employee.full_name,
        value: employee.id,
      })),
    [employees]
  );
  const locationsOptions = useMemo(
    () =>
      (locations as LocationDetails[]).map((location) => ({
        label: location.name,
        value: location.id,
      })),
    [locations]
  );

  const initialValues: EmployeeShiftFormValues = {
    employee_id: 1,
    location_id: 2,
    date: "2023-12-01",
    from_time: "08:00:00",
    to_time: "12:00:00",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        emplooyee_id: Yup.string().required("Required"),
        location_id: Yup.string().required("Required"),
        date: Yup.string().required("Required"),
        from_time: Yup.string().required("Required"),
        to_time: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await axios.post("/api/shifts", values);
          router.replace("/shifts");
        } catch (error: any) {
          toast.error(
            error.message || "Something went wrong in creating new shift"
          );
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-4">
          <Field name="email" autoComplete="email" label="Email Address" />
          <Field name="password" type="password" label="Password" />
          <SimpleButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </SimpleButton>
        </Form>
      )}
    </Formik>
  );
};

export default EmployeeShiftForm;
