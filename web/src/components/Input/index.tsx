import { Field } from "formik";

import "./styles.css";

interface InputProps {
  label: string;
  name: string;
  type?: string
}

const Input = ({ label, name, type }: InputProps) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} type={type}/>
    </div>
  );
};

export default Input;
