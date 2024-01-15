import { TextAreaType } from "../../../../typings";
import ErrorNotification from "../../ErrorNotification";

const TextArea = ({
  placeholder,
  name,
  value,
  required,
  onChange,
  error,
}: TextAreaType) => {
  return (
    <>
      <textarea
        data-testid={`form-field-${name}`}
        className="w-full h-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
        placeholder={placeholder}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
      ></textarea>
      {error && error[name] && <ErrorNotification message={error[name]} />}
    </>
  );
};

export default TextArea;
