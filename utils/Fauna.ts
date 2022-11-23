import faunadb from "faunadb";
import { FeedbackResponseType } from "../typings";

const faunaClient = new faunadb.Client({
  secret: process.env.FAUNA_SECRET as string,
});

const query = faunadb.query;

const FEEDBACK_RESPONSES_COLLECTION = "feedback-responses";

const getFeedbackResponses = async (): Promise<FeedbackResponseType[]> => {
  const { data } = await faunaClient.query(
    query.Map(
      query.Paginate(
        query.Reverse(
          query.Documents(query.Collection(FEEDBACK_RESPONSES_COLLECTION))
        )
      ),
      query.Lambda("ref", query.Get(query.Var("ref")))
    )
  );

  const feedbackResponses = data.map((response: any) => {
    response.id = response.ref.id;
    delete response.ref;

    return response;
  });

  return feedbackResponses;
};

const saveFeedbackResponse = async (feedbackResponse: FeedbackResponseType) => {
  return await faunaClient.query(
    query.Create(query.Collection(FEEDBACK_RESPONSES_COLLECTION), {
      data: feedbackResponse,
    })
  );
};

export { getFeedbackResponses, saveFeedbackResponse };
