// import { SelectType } from "../../../../typings";

import { SelectFieldOption, SelectFieldType } from "../../../../typings";

const Select = ({ options, name, required, onChange }: SelectFieldType) => {
  return (
    <select
      className="w-full h-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
      name={name}
      required={required}
      onChange={onChange}
    >
      {options.map(({ value, label }: SelectFieldOption, OptionIndex) => (
        <option
          key={`option-${OptionIndex}`}
          selected={OptionIndex == 0}
          value={value}
        >
          {label}
        </option>
      ))}
    </select>
  );
};

export default Select;
