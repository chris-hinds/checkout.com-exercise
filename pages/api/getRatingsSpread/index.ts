// Typings
import { NextApiRequest, NextApiResponse } from "next";
import { getFeedbackResponses } from "../../../utils/Fauna";

const getRatingsSpread = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== "GET") {
    res.status(405).send({ message: "Only GET requests allowed" });
    return;
  }

  try {
    const data = await getFeedbackResponses();

    if (!data) throw Error("Error getting results");

    const ratingsSpread = [1, 2, 3, 4, 5];

    const sumOfRatings = ratingsSpread.map((value) => {
      let sum = 0;
      data.map((dataPoint) => {
        if (parseInt(dataPoint.data.rating) === value) {
          sum += 1;
        }
      });

      return sum;
    });

    return res.status(200).send({
      labels: ["5 Star", "4 Star", "3 Star", "2 Star", "1 Star"],
      data: sumOfRatings.reverse(),
    });
  } catch (error: any) {
    const errorMessage = error?.message ?? "Error getting ratings spread";

    // Temporary error logging for debugging
    console.error(error);

    return res.status(500).send(errorMessage);
  }
};

export default getRatingsSpread;
