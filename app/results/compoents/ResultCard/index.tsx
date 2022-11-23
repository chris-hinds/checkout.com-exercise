// Typings
import { GetFeedbackResultsType } from "../../../../typings";

const ResultCard = ({ feedback }: { feedback: GetFeedbackResultsType }) => {
  const { name, email, rating, comment } = feedback.data;
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img
            className="w-8 h-8 rounded-full"
            src={`https://i.pravatar.cc/40?u=${feedback.id}`}
            alt={`${name} Profile Picture`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {email}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {rating}
        </div>
      </div>
      <div className="mt-2">
        <p>{comment}</p>
      </div>
    </li>
  );
};

export default ResultCard;
