import { Field as FormikField } from "formik";
import { twMerge } from "tailwind-merge";

interface FieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  labelClassname?: string;
}

const Field = (props: FieldProps) => {
  const { label, labelClassname, name, className = "", ...inputProps } = props;

  return (
    <div>
      <label
        htmlFor="email"
        className={twMerge(
          "block text-sm font-medium leading-6 text-gray-900",
          labelClassname
        )}
      >
        {label}
      </label>
      <FormikField
        {...inputProps}
        id={name}
        name={name}
        className={twMerge(
          "block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
          className
        )}
      />
    </div>
  );
};

export default Field;
