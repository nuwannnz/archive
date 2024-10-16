import { Box } from "@mui/material";
import React from "react";

interface FormFieldBoxProps {
  children: JSX.Element | JSX.Element[];
}

const FormFieldBox: React.FC<FormFieldBoxProps> = ({ children }) => {
  return <Box sx={{ marginBottom: "10px" }}>{children}</Box>;
};

export default FormFieldBox;
