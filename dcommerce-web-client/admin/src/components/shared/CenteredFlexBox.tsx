import { Box } from "@mui/material";
import React from "react";

interface Props {
  width?: string;
  height?: string;
  children: JSX.Element;
}
const CenteredFlexBox: React.FC<Props> = ({ width, height, children }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: width ?? "100%",
        height: height ?? "100%",
      }}
    >
      {children}
    </Box>
  );
};

export default CenteredFlexBox;
