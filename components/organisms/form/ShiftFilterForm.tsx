import { useCallback } from "react";
import { Formik, Form } from "formik";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";
import axios from "axios";
import Field from "@/components/molecules/form/Field";
import SimpleButton from "@/components/molecules/button/Simple";
import DatePicker from "@/components/molecules/form/DatePicker";

interface ShiftFilterFormValues {
  from: string;
  to: string;
}

const ShiftFilterForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const initialValues: ShiftFilterFormValues = {
    from: from || "2023-12-01",
    to: to || "2023-12-04",
  };

  const createQueryString = useCallback(
    (newSearchParams: Record<string, string>) => {
      const params = new URLSearchParams(searchParams);

      Object.entries(newSearchParams).forEach(([name, value]) => {
        params.set(name, value);
      });

      return params.toString();
    },
    [searchParams]
  );

  const clearFilter = useCallback(() => {
    router.push(pathname);
  }, [pathname, router]);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        from: Yup.string(),
        to: Yup.string(),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const newParams: Record<string, string> = {
            from: values.from,
            to: values.to,
          };
          router.push(pathname + "?" + createQueryString(newParams));
        } catch (error: any) {
          toast.error(
            error.message || "Something went wrong in applying filter"
          );
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex items-start gap-4">
          <DatePicker name="from" />
          <DatePicker name="to" />
          <SimpleButton
            className="h-[40px] w-[200px]"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Applying Filter..." : "Apply Filter"}
          </SimpleButton>
          <SimpleButton
            className="h-[40px] w-[200px] bg-gray-300 hover:bg-gray-400"
            type="button"
            onClick={clearFilter}
          >
            Clear Filter
          </SimpleButton>
        </Form>
      )}
    </Formik>
  );
};

export default ShiftFilterForm;
