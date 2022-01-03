import { useField } from "formik";

import "./styles.css";

interface TextareaProps {
  label: string;
  name: string;
}

const Textarea = ({ label, name }: TextareaProps) => {
  const [field] = useField(name);

  return (
    <div className="textarea-block">
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        id={name}
        value={field.value}
        onChange={field.onChange}
      />
    </div>
  );
};

export default Textarea;
