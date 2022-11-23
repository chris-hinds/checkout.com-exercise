import { FeedbackResponseType, GetFeedbackResultsType } from "../../typings";

const getFeedbackResults = async (): Promise<GetFeedbackResultsType[]> => {
  try {
    const response = await fetch(
      `${process.env.BASE_FETCH_URL}/api/getFeedbackResults`
    );

    return await response.json();
  } catch (error) {
    throw new Error("Failed to fetch feedback results", error);
  }
};

const ResultsPage = async () => {
  const feedbackResults = await getFeedbackResults();

  return (
    <div>
      {feedbackResults &&
        feedbackResults.map((feedback: GetFeedbackResultsType) => (
          <p>{feedback.data.email}</p>
        ))}
    </div>
  );
};

export default ResultsPage;
