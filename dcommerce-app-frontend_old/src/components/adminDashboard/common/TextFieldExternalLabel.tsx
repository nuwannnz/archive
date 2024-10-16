/* eslint-disable react/require-default-props */
import { Typography, TextField } from "@material-ui/core";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";

export default function TextFieldExternalLabel({
  formik,
  params,
  name,
  label,
  type = "text",
}: {
  formik: any;
  params?: any;
  name: string;
  label: string;
  type?: string;
}) {
  return (
    <>
      <Grid xs={12} sm={6} md={6}>
        <Typography>{label}</Typography>
      </Grid>
      <Grid xs={12} sm={6} md={6}>
        <TextField
          id={name}
          name={name}
          value={formik.values[name]}
          error={formik.touched[name] && Boolean(formik.errors[name])}
          helperText={formik.touched[name] && formik.errors[name]}
          onChange={formik.handleChange}
          variant="outlined"
          type={type}
          placeholder={label}
          disabled={params.mode === "view"}
          // InputProps={{
          //   startAdornment: (
          //     <InputAdornment position="start">$</InputAdornment>
          //   ),
          // }}
          multiline={type === "textArea"}
          fullWidth
          required
        />
      </Grid>
    </>
  );
}
