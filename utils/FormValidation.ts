import * as yup from "yup";

export const feedbackFormSchema = yup.object().shape({
  name: yup.string().trim().min(2).required(),
  email: yup.string().email().required(),
  rating: yup.number().min(1).max(5).required(),
  comment: yup
    .string()
    .min(20, "Please use at least 20 characters for the comment")
    .max(300, "Whoa! More that 300 Characters is a little too much.")
    .required(),
});
