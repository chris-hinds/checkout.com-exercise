// Types
import type { NextPage } from "next";

// Components
import FeedbackForm from "./components/FeedbackForm";

const FeedbackPage: NextPage = () => {
  return (
    <div className="flex items-center h-[calc(100vh-56px)] w-full md:w-[75%] max-w-[1000px] mx-auto">
      <FeedbackForm />
    </div>
  );
};

export default FeedbackPage;
