import React from "react";
import { CardContent, Grid, TextField, Button } from "@material-ui/core";
import { Card } from "@mui/material";
import { useFormik } from "formik";
import { loginValidation } from "../../validation/validate";

interface LoginStepOneProps {
  onSubmit: (email: string) => void;
}
function LoginStepOne({ onSubmit }: LoginStepOneProps) {
  /**
   * validations for login step one
   */
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      onSubmit(values.email);
    },
  });

  return (
    <Card style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container justifyContent="center" spacing={5}>
            <Grid xs={10} sm={12} item>
              <TextField
                label="Email"
                id="email"
                name="email"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                onChange={formik.handleChange}
                placeholder="Enter email here"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>

            <Grid xs={8} sm={12} item>
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
      </CardContent>
    </Card>
  );
}

export default LoginStepOne;
