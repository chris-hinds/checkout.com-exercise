import { InputFieldType } from "../../../../typings";
import ErrorNotification from "../../ErrorNotification";

const InputField = ({
  type,
  placeholder,
  name,
  value,
  required,
  onChange,
  error,
}: InputFieldType) => {
  return (
    <>
      <input
        data-testid={`form-field-${name}`}
        className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
      {error && error[name] && <ErrorNotification message={error[name]} />}
    </>
  );
};

export default InputField;
