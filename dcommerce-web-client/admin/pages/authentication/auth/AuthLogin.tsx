import React from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  CircularProgress,
  Alert,
} from "@mui/material";
import Link from "next/link";

import CustomTextField from "../../../src/components/forms/theme-elements/CustomTextField";
import { useFormik } from "formik";
import { emailValidation, otpValidation } from "../../../src/validations/login";

interface loginType {
  isStepOne: boolean;
  isLoading: boolean;
  email?: string;
  title?: string;
  error?: string | null;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
  submitStepOne: (email: string) => void;
  submitStepTwo: (otp: string) => void;
}

const AuthLogin = ({
  isStepOne,
  isLoading,
  email,
  title,
  subtitle,
  subtext,
  error,
  submitStepOne,
  submitStepTwo,
}: loginType) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    validationSchema: isStepOne ? emailValidation : otpValidation,
    onSubmit: (values) => {
      if (isStepOne) {
        submitStepOne(values.email);
        formik.resetForm();
      } else {
        submitStepTwo(values.otp);
        formik.resetForm();
      }
    },
  });

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <form onSubmit={formik.handleSubmit}>
        <Stack mb="20px">
          {isStepOne && (
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="username"
                mb="5px"
              >
                Your Email
              </Typography>
              <CustomTextField
                name="email"
                variant="outlined"
                fullWidth
                type="email"
                onChange={formik.handleChange}
              />
            </Box>
          )}

          {!isStepOne && (
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="username"
                mb="5px"
              >
                Enter the OTP sent to {email}
              </Typography>
              <CustomTextField
                name="otp"
                variant="outlined"
                fullWidth
                type="number"
                onChange={formik.handleChange}
              />
            </Box>
          )}
        </Stack>
        {error && <Alert severity="error">{error}</Alert>}
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            {isLoading ? (
              <CircularProgress color="secondary" size={25} />
            ) : (
              "Sign In"
            )}
          </Button>
        </Box>
      </form>
      {subtitle}
    </>
  );
};

export default AuthLogin;
