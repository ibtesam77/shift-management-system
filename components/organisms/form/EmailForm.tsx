import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import axios from "axios";
import Field from "@/components/molecules/form/Field";
import SimpleButton from "@/components/molecules/button/Simple";
import { EmployeeShiftDetails } from "@/types/shift";

interface EmailFormProps {
  shifts: EmployeeShiftDetails[];
  onClose: () => void;
}

interface EmailFormValues {
  email: string;
}

const EmailForm = (props: EmailFormProps) => {
  const { shifts, onClose } = props;

  const initialValues: EmailFormValues = {
    email: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        email: Yup.string().email("Invalid Email").required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await axios.post("/api/shifts/report/send", {
            ...values,
            shifts: shifts.map((shift) => shift.id),
          });
          toast.success("Email sent successfully");
          onClose();
        } catch (error: any) {
          toast.error(
            error.message || "Something went wrong in sending shifts report"
          );
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-4">
          <Field name="email" autoComplete="email" label="Email Address" />
          <SimpleButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending Report ..." : "Send Report"}
          </SimpleButton>
        </Form>
      )}
    </Formik>
  );
};

export default EmailForm;
