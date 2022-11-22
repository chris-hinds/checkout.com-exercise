import { InputFieldType } from "../../../../typings";

const InputField = ({
  type,
  placeholder,
  name,
  value,
  required,
  onChange,
}: InputFieldType) => {
  return (
    <input
      className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputField;
