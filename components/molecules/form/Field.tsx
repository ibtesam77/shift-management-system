import { Label, TextInput, TextInputProps } from "flowbite-react";
import { useField } from "formik";

interface FieldProps extends TextInputProps {
  label: string;
  name: string;
  labelClassname?: string;
}

const Field = (props: FieldProps) => {
  const { label, labelClassname, name, ...inputProps } = props;

  const [field, meta] = useField(name);

  return (
    <div>
      <Label color="gray" htmlFor={name} value={label} />
      <TextInput
        {...inputProps}
        {...field}
        id={name}
        name={name}
        color={meta.touched && meta.error ? "failure" : "gray"}
        helperText={<span>{meta.error}</span>}
      />
    </div>
  );
};

export default Field;
