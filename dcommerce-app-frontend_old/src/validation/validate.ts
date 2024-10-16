import * as yup from "yup";

const signupValidation = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  userName: yup
    .string()
    .min(4, "Name should be of minimum 4 characters length")
    .required("Password is required"),
});

const loginValidation = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

const otpValidation = yup.object({
  otp: yup.number().required("OTP is required"),
});

const productCategoryValidation = yup.object({
  productName: yup.string().required("Product Name is required"),
});

const productValidation = yup.object({
  name: yup.string().required("Name is required"),
  quantity: yup.number().required("Quantity is required"),
  productCategoryId: yup.string().required("Product Category is required"),
});

const productAttributeValidation = yup.object({
  name: yup.string().required("Name is required"),
  options: yup.string().required("At least one option is required"),
});

export {
  signupValidation,
  otpValidation,
  loginValidation,
  productCategoryValidation,
  productValidation,
  productAttributeValidation,
};
