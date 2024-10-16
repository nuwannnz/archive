import { Box } from "@mui/material";
import React from "react";

interface Props {
  vertical: "top" | "bottom";
  horizontal: "left" | "right";
  children: JSX.Element;
}
const FixedPositionedBox: React.FC<Props> = ({
  vertical,
  horizontal,
  children,
}) => {
  const positionProps = {
    top: vertical === "top" ? "20px" : undefined,
    bottom: vertical === "bottom" ? "20px" : undefined,
    left: horizontal === "left" ? "20px" : undefined,
    right: horizontal === "right" ? "20px" : undefined,
  };
  return (
    <Box
      sx={{
        position: "fixed",
        ...positionProps,
      }}
    >
      {children}
    </Box>
  );
};

export default FixedPositionedBox;
