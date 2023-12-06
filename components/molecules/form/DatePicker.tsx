import {
  Datepicker as FlowbiteDatePicker,
  DatepickerProps as FlowbiteDatePickerProps,
} from "flowbite-react";
import { useField } from "formik";

interface DatePickerProps extends FlowbiteDatePickerProps {
  name: string;
}

const DatePicker = (props: DatePickerProps) => {
  const { name, ...datePickerProps } = props;

  const [field, meta] = useField(name);

  return (
    <FlowbiteDatePicker
      // {...field}
      {...datePickerProps}
      // value={field.value}
      className="min-w-[200px]"
      color={meta.touched && meta.error ? "failure" : "gray"}
      helperText={<span>{meta.error}</span>}
      onChange={(date) => console.log(date.target.value)}
    />
  );
};

export default DatePicker;
