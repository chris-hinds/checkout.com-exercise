// Typings
import { NextApiRequest, NextApiResponse } from "next";

const submitFeedback = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;

  if (method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  console.log(body);

  res.status(200).send("OK");
};

export default submitFeedback;
