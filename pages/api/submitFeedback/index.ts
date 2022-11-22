// Typings
import { NextApiRequest, NextApiResponse } from "next";
import { saveFeedbackResponse } from "../../../utils/Fauna";

const submitFeedback = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;

  if (method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  try {
    await saveFeedbackResponse(body);
    return res.status(201).send("ok");
  } catch (error: any) {
    const errorMessage =
      error?.message ?? "Error saving feedback response to the database";

    // Temporary error logging for debugging
    console.error(error);

    return res.status(500).send(errorMessage);
  }
};

export default submitFeedback;
