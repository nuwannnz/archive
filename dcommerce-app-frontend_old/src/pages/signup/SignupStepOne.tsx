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
import { signupValidation } from "../../validation/validate";

interface SignupStepOneProps {
  onSubmit: (email: string, name: string) => void;
  email: string;
  name: string;
}
function SignupStepOne({ onSubmit, email, name }: SignupStepOneProps) {
  /**
   * validations for signup
   */
  const formik = useFormik({
    initialValues: {
      email,
      name,
    },
    validationSchema: signupValidation,
    onSubmit: (values) => {
      onSubmit(values.email, values.name);
    },
  });

  return (
    <div style={{ marginTop: "5rem" }} className="center">
      <Typography gutterBottom variant="h3" align="center">
        SignUp
      </Typography>
      <Card style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container justifyContent="center" spacing={5}>
              <Grid xs={9} sm={12} item>
                <TextField
                  label="Enter Your Mail"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  placeholder="E-mail here"
                  onChange={formik.handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>

              <Grid xs={9} sm={12} item>
                <TextField
                  id="userName"
                  name="userName"
                  label="Enter Your Name"
                  placeholder="Enter Your Name"
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>

              <Grid xs={6} sm={12} item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Signup
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignupStepOne;
