import { Grid } from "@material-ui/core";
import React from "react";
import { Outlet } from "react-router-dom";

function SettingContentPage() {
  return (
    <Grid container style={{ width: "100%", height: "100%", padding: "1rem" }}>
      <Outlet />
    </Grid>
  );
}

export default SettingContentPage;
