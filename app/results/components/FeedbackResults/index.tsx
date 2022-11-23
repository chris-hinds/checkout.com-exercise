// Components
import { GetFeedbackResultsType } from "../../../../typings";
import ResultCard from "../ResultCard";

const FeedbackResults = ({
  feedbackResults,
}: {
  feedbackResults: GetFeedbackResultsType[];
}) => {
  if (!feedbackResults) return null;
  return (
    <div className="flow-root">
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        {feedbackResults.map((feedback: GetFeedbackResultsType) => (
          <ResultCard key={feedback.id} feedback={feedback} />
        ))}
      </ul>
    </div>
  );
};

export default FeedbackResults;
