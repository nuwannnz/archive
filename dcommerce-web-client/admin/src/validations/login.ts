import * as yup from "yup";

export const otpValidation = yup.object({
  otp: yup.number().required("OTP is required"),
});

export const emailValidation = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});
