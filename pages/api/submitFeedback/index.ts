// Typings
import { NextApiRequest, NextApiResponse } from "next";
import { saveFeedbackResponse } from "../../../utils/Fauna";

const UNIQUE_DOCUMENT_ERROR_CODE = "document is not unique.";

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
    if (error?.description === UNIQUE_DOCUMENT_ERROR_CODE) {
      return res.status(409).send("This email has already submitted feedback.");
    }

    const errorMessage =
      error?.message ?? "Error saving feedback response to the database";

    return res.status(500).send(errorMessage);
  }
};

export default submitFeedback;
