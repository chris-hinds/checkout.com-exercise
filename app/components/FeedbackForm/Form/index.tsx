"use client";

// Framework
import { ChangeEvent, SyntheticEvent, useState } from "react";

// Components
import InputField from "../../FormElements/InputField";
import Select from "../../FormElements/Select";
import TextArea from "../../FormElements/TextArea";

// Data
import { startRatingOptions } from "../StarRatingOptions";
import { initialFeedbackFormState } from "../FeedbackFormState";

const FeedbackForm = () => {
  const [formData, setFormData] = useState(initialFeedbackFormState);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: SyntheticEvent) => {
    // Prevent form submission from refreshing the page
    e.preventDefault();

    alert(JSON.stringify(formData, null, 2)); // Sanitize string data
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-5 lg:gap-y-0 lg:gap-5 mt-5">
        <div className="grid gap-5 col-span-1">
          <InputField
            type="text"
            name="name"
            placeholder="Name*"
            required={true}
            onChange={handleInputChange}
          />
          <InputField
            type="email"
            name="email"
            placeholder="Email*"
            required={true}
            onChange={handleInputChange}
          />
          <Select
            name="rating"
            options={startRatingOptions}
            onChange={handleInputChange}
            required={true}
          />
        </div>
        <div className="col-span-2">
          <TextArea
            name="comment"
            placeholder="Comment*"
            required={true}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="my-4 w-1/2 lg:w-1/4">
        <button
          type="submit"
          className="uppercase text-sm font-bold tracking-wide bg-brand text-gray-100 p-3 rounded-lg w-full 
            focus:outline-none focus:shadow-outline"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
