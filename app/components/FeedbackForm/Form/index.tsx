"use client";

// Framework
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

// Components
import InputField from "../../FormElements/InputField";
import Select from "../../FormElements/Select";
import TextArea from "../../FormElements/TextArea";

// Data
import { startRatingOptions } from "../StarRatingOptions";
import { initialFeedbackFormState } from "../FeedbackFormState";
import Button from "../../Button";

const FeedbackForm = () => {
  const [formData, setFormData] = useState(initialFeedbackFormState);
  const [formDataIsSaving, setFormDataIsSaving] = useState(false);
  const router = useRouter();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: SyntheticEvent) => {
    // Prevent form submission from refreshing the page
    e.preventDefault();

    // Set loading state
    setFormDataIsSaving(true);

    // TODO: Validate form data

    try {
      const saveFormDataResponse = await fetch("/api/submitFeedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      saveFormDataResponse.json();

      router.push("/results");
    } catch (error) {
      console.error(error);
      alert("error saving feedback response");
    } finally {
      setFormDataIsSaving(false);
      setFormData(initialFeedbackFormState);
    }
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
        <Button
          type="submit"
          label="Send Feedback"
          isDisabled={formDataIsSaving}
          isLoading={formDataIsSaving}
        />
      </div>
    </form>
  );
};

export default FeedbackForm;
