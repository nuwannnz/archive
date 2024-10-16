import React from "react";
import { CardContent, Grid, TextField, Button } from "@material-ui/core";
import { Card } from "@mui/material";
import { useFormik } from "formik";
import { otpValidation } from "../../validation/validate";

interface LoginStepTwoProps {
  email: string;
  onSubmit: (opt: string) => void;
}

function LoginStepTwo({ email, onSubmit }: LoginStepTwoProps) {
  const formik = useFormik({
    initialValues: {
      email,
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
              <Grid xs={12} sm={6} item>
                <TextField
                  label="Email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  onChange={formik.handleChange}
                  placeholder="Enter email here"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <Button
                  style={{ height: "55px" }}
                  // type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  Change
                </Button>
              </Grid>

              <Grid xs={12} sm={12} item>
                <TextField
                  label="OTP"
                  id="otp"
                  name="otp"
                  value={formik.values.otp}
                  error={formik.touched.otp && Boolean(formik.errors.otp)}
                  helperText={formik.touched.otp && formik.errors.otp}
                  placeholder="Enter the OTP you received in your email"
                  onChange={formik.handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>

              <Grid xs={12} sm={12} item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>

          {/* <Typography style={{ marginTop: "1rem" }} variant="h5" align="center">
            Please Check Your Email
          </Typography> */}
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginStepTwo;
