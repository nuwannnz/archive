import React from "react";
import { CardContent } from "@material-ui/core";
import { Card } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import PageLayout from "../common/PageLayout";
import SettingSidebar from "./SettingSidebar";
import SettingContainer from "./SettingContent";

function Setting() {
  return (
    <PageLayout title="Setting">
      <Card
        className="card-container"
        sx={{
          width: { xs: 300, sm: 400, md: 450, lg: 1000 },
          height: "100%",
          boxShadow: 20,
        }}
      >
        <CardContent>
          <Grid container>
            <Grid lg={3} md={3} sm={3} xs={12}>
              <SettingSidebar />
            </Grid>
            <Grid lg={9} md={9} sm={9} xs={12}>
              <SettingContainer />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </PageLayout>
  );
}

export default Setting;
