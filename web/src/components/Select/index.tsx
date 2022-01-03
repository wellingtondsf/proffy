import { useField } from "formik";

import "./styles.css";

interface SelectOptions {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  options: SelectOptions[];
}

const Select = ({ label, name, options }: SelectProps) => {
  const [field] = useField(name);

  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select
        defaultValue=""
        name={name}
        id={name}
        value={field.value}
        onChange={field.onChange}
      >
        <option value={""} disabled hidden>
          Select an option
        </option>
        {options.map((option) => {
          return (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
