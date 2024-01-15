"use client";

// Framework
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

// Schema
import { feedbackFormSchema } from "../../../../utils/FormValidation";

// Components
import InputField from "../../FormElements/InputField";
import Select from "../../FormElements/Select";
import TextArea from "../../FormElements/TextArea";
import ErrorNotification from "../../ErrorNotification";
import Button from "../../Button";

// Data
import { startRatingOptions } from "../StarRatingOptions";
import { initialFeedbackFormState } from "../FeedbackFormState";

const FeedbackForm = () => {
  const [formData, setFormData] = useState(initialFeedbackFormState);
  const [formDataIsSaving, setFormDataIsSaving] = useState(false);
  const [hasSubmissionError, setHasSubmissionError] = useState(false);
  const [hasValidationError, setHasValidationError] = useState(undefined);
  const router = useRouter();

  const resetFormErrorState = () => {
    setHasSubmissionError(false);
    setHasValidationError({});
  };

  const resetFormLoadingState = () => {
    setFormDataIsSaving(false);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: SyntheticEvent) => {
    // Prevent form submission from refreshing the page
    e.preventDefault();

    resetFormErrorState();

    // Set loading state
    setFormDataIsSaving(true);

    try {
      const validatedFormData = await feedbackFormSchema.validateSync(
        formData,
        { abortEarly: false }
      );

      const response = await fetch("/api/submitFeedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedFormData),
      });

      if (response.status == 409) {
        setHasSubmissionError(true);
        return;
      }

      if (response.ok) {
        resetFormErrorState();
        router.push("/results");
        return;
      }
    } catch (error: any) {
      console.log(error);
      const errorObject = {
        [error.inner[0].path]: error.inner[0].message,
      };

      setHasValidationError(errorObject as any);
    } finally {
      resetFormLoadingState();
    }
  };

  return (
    <>
      <form data-testid="feedback-form" onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-5 lg:gap-y-0 lg:gap-5 mt-5">
          <div className="grid gap-5 col-span-1">
            <InputField
              type="text"
              name="name"
              placeholder="Name*"
              required={true}
              onChange={handleInputChange}
              error={hasValidationError}
            />
            <InputField
              type="email"
              name="email"
              placeholder="Email*"
              required={true}
              onChange={handleInputChange}
              error={hasValidationError}
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
              error={hasValidationError}
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
      {hasSubmissionError && (
        <ErrorNotification message="This email address has already been used to submit a review." />
      )}
    </>
  );
};

export default FeedbackForm;
