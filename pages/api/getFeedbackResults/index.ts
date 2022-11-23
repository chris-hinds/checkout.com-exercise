// Typings
import { NextApiRequest, NextApiResponse } from "next";
import { getFeedbackResponses } from "../../../utils/Fauna";

const getFeedbackResults = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { method } = req;

  if (method !== "GET") {
    res.status(405).send({ message: "Only GET requests allowed" });
    return;
  }

  try {
    const data = await getFeedbackResponses();

    if (!data) throw Error("Error getting results");

    return res.status(200).send(data);
  } catch (error: any) {
    const errorMessage = error?.message ?? "Error getting feedback response";

    // Temporary error logging for debugging
    console.error(error);

    return res.status(500).send(errorMessage);
  }
};

export default getFeedbackResults;
