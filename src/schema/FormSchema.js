import * as yup from "yup";

export const basicSchema = yup.object().shape({
  Book: yup
    .string("Please enter valid book name")
    .min(4, "Book name must be grater than 4 characters"),
  email: yup
    .string("Please enter valid book name")
    .email("please enter a valid email"),
  RecipientName: yup
    .string("Please enter a valid name")
    .min(4, "RecipientName name must be grater than 4 characters"),
});
