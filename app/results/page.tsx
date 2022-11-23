// Typings
import { GetFeedbackResultsType } from "../../typings";

// Components
import FeedBackRatingsChart from "./components/FeedBackRatingsChart";
import FeedbackResults from "./components/FeedbackResults";

// Config
import { HOST_URL } from "../../utils/Config";

const getFeedbackResults = async (): Promise<GetFeedbackResultsType[]> => {
  try {
    const response = await fetch(`${HOST_URL}/api/getFeedbackResults`);

    return await response.json();
  } catch (error: any) {
    throw new Error("Failed to fetch feedback results", error);
  }
};

const ResultsPage = async () => {
  const feedbackResults = await getFeedbackResults();

  return (
    <div className="container mx-auto">
      <FeedBackRatingsChart />
      <h1 className="font-bold uppercase text-2xl">
        Latest Comments - ({feedbackResults.length ?? 0})
      </h1>
      <FeedbackResults feedbackResults={feedbackResults} />
    </div>
  );
};

export default ResultsPage;
