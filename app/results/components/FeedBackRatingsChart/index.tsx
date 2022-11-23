// Typings
import { RatingsSpreadType } from "../../../../typings";

// Components
import BarChart from "../BarChart";

// Config
import { HOST_URL } from "../../../../utils/Config";

const getFeedbackResults = async (): Promise<RatingsSpreadType> => {
  try {
    const response = await fetch(`${HOST_URL}/api/getRatingsSpread`);

    return await response.json();
  } catch (error: any) {
    throw new Error("Failed to fetch ratings spread", error);
  }
};

const FeedBackRatingsChart = async () => {
  const ratingsSpreadData = await getFeedbackResults();

  return (
    <div className="mb-4">
      {ratingsSpreadData && (
        <BarChart
          labels={ratingsSpreadData.labels}
          data={ratingsSpreadData.data}
        />
      )}
    </div>
  );
};

export default FeedBackRatingsChart;
