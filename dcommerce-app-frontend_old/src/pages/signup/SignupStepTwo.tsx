import React from "react";
import {
  Typography,
  CardContent,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { Card } from "@mui/material";
import { useFormik } from "formik";
import { otpValidation } from "../../validation/validate";

interface SignupStepTwoProps {
  onSubmit: (opt: string) => void;
  onGoBack: () => void;
}

function SignupStepTwo({ onSubmit, onGoBack }: SignupStepTwoProps) {
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: otpValidation,
    onSubmit: (values) => {
      onSubmit(values.otp);
    },
  });

  return (
    <div className="center">
      <Card style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={5}>
              <Grid xs={12} sm={12} item>
                <TextField
                  label="Enter the OTP you received to your email"
                  id="otp"
                  name="otp"
                  value={formik.values.otp}
                  error={formik.touched.otp && Boolean(formik.errors.otp)}
                  helperText={formik.touched.otp && formik.errors.otp}
                  placeholder="OTP here"
                  onChange={formik.handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>

              <Grid xs={12} sm={6} item>
                <Button
                  style={{ height: "55px" }}
                  type="button"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={onGoBack}
                >
                  Change your email
                </Button>
              </Grid>

              <Grid xs={12} sm={12} item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>

          <Typography style={{ marginTop: "1rem" }} variant="h5" align="center">
            Please Check Your Email
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignupStepTwo;
