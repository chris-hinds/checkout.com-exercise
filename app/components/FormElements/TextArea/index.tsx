import { TextAreaType } from "../../../../typings";

const TextArea = ({
  placeholder,
  name,
  value,
  required,
  onChange,
}: TextAreaType) => {
  return (
    <textarea
      className="w-full h-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
      placeholder={placeholder}
      name={name}
      value={value}
      required={required}
      onChange={onChange}
    ></textarea>
  );
};

export default TextArea;
