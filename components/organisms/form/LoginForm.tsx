import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";
import axios from "axios";
import Field from "@/components/molecules/form/Field";
import SimpleButton from "@/components/molecules/button/Simple";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const initialValues: LoginFormValues = {
    email: "test@gmail.com",
    password: "test@1122",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        email: Yup.string().email("Invalid Email").required("Required"),
        password: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await axios.post("/api/auth/login", values);
          router.replace("/shifts");
        } catch (error: any) {
          toast.error("Invalid Credentials");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-4">
          <Field type="email" name="email" label="Email Address" />
          <Field type="password" name="password" label="Password" />
          <SimpleButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </SimpleButton>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
