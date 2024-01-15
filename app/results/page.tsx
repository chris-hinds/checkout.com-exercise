import { headers } from "next/headers";

// Typings
import { GetFeedbackResultsType, RatingsSpreadType } from "../../typings";

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

const getRatingsSpread = async (): Promise<RatingsSpreadType> => {
  try {
    const response = await fetch(`${HOST_URL}/api/getRatingsSpread`);

    return await response.json();
  } catch (error: any) {
    throw new Error("Failed to fetch ratings spread", error);
  }
};

const ResultsPage = async () => {
  headers(); // Forces page to render dynamically fixing a build time issue in te nextjs 13 beta
  const feedbackResults = await getFeedbackResults();
  const ratingsSpreadData = await getRatingsSpread();

  return (
    <div className="container mx-auto">
      <FeedBackRatingsChart ratingsSpreadData={ratingsSpreadData} />
      <h1 className="font-bold uppercase text-2xl">
        Latest Comments - ({feedbackResults.length ?? 0})
      </h1>
      <FeedbackResults feedbackResults={feedbackResults} />
    </div>
  );
};

// // This should prevent NextJS trying to pre-render this page at build-time (it fails as the api is not available), however there seems to be a bug in the latest beta
// export const dynamic = "force-dynamic";

export default ResultsPage;
