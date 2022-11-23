// Typings
import { ButtonType } from "../../../typings";

// Components
import LoadingSpinner from "../LoadingSpinner";

const Button = ({
  type = "button",
  label,
  onClick,
  isLoading,
  isDisabled,
}: ButtonType) => {
  return (
    <button
      className="uppercase text-sm font-bold tracking-wide bg-brand text-gray-100 p-3 rounded-lg w-full 
    focus:outline-none focus:shadow-outline inline-flex items-center"
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {isLoading && <LoadingSpinner />}
      {label}
    </button>
  );
};

export default Button;
