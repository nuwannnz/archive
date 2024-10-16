import { Grid } from "@material-ui/core";
import React from "react";
import { Outlet } from "react-router-dom";

function DashboardContentPage() {
  return (
    <Grid container>
      <Outlet />
    </Grid>
  );
}

export default DashboardContentPage;
