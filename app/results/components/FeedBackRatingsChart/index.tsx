// Typings
import { RatingsSpreadType } from "../../../../typings";

// Components
import BarChart from "../BarChart";

const FeedBackRatingsChart = ({
  ratingsSpreadData,
}: {
  ratingsSpreadData: RatingsSpreadType;
}) => {
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
