// Types
import type { NextPage } from "next";

// Components
import FeedbackForm from "./components/FeedbackForm";

const FeedbackPage: NextPage = () => {
  return (
    <div className="flex items-center h-[calc(100vh-56px)] max-w-full md:max-w-[75%] mx-auto">
      <FeedbackForm />
    </div>
  );
};

export default FeedbackPage;
