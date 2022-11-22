// Components
import FeedbackForm from "./Form";

const FeedbackFormContainer = () => {
  return (
    <div className="w-full mx-auto p-4 rounded-2xl shadow-2xl">
      <h1 className="font-bold uppercase text-3xl">
        How was your <br /> Experience?
      </h1>

      <FeedbackForm />
    </div>
  );
};

export default FeedbackFormContainer;
