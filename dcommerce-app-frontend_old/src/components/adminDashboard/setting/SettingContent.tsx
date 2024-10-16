import React from "react";
import Grid from "@mui/material/Grid";
import SettingContentPage from "./SettingContentPage";

function SettingContent() {
  return (
    <Grid
      style={{
        padding: "1rem",
        height: "100%",
        width: "100%",
      }}
    >
      <SettingContentPage />
    </Grid>
  );
}

export default SettingContent;
