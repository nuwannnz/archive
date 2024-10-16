import React from "react";
import { Typography, CardContent } from "@material-ui/core";
import { Card } from "@mui/material";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import PageLayout from "../../../components/adminDashboard/common/PageLayout";

function Order() {
  // eslint-disable-next-line no-unused-vars
  const params = useParams();
  return (
    <PageLayout title="Orders Page">
      <Card
        className="card-container"
        sx={{
          width: { xs: "100%", sm: 400, md: 450, lg: 520 },
          boxShadow: 20,
        }}
      >
        <CardContent>
          <form>
            <Grid
              rowSpacing={{ xs: 6, sm: 10, md: 10, lg: 10 }}
              columnSpacing={{ xs: 1, sm: 3, md: 3, lg: 10 }}
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              className="card-labels"
            >
              <Grid xs={4} sm={4} md={4} lg={4}>
                <Typography>Product Name</Typography>
              </Grid>
              <Grid xs={4} sm={4} md={4} lg={4}>
                <Typography>:</Typography>
              </Grid>

              <Grid xs={4} sm={4} md={4} lg={4}>
                <Typography>Nikon Camera</Typography>
              </Grid>
              <Grid xs={4} sm={4} md={4} lg={4}>
                <Typography>Customer Name</Typography>
              </Grid>
              <Grid xs={4} sm={4} md={4} lg={4}>
                <Typography>:</Typography>
              </Grid>

              <Grid xs={4} sm={4} md={4} lg={4}>
                <Typography>Jakob Miles</Typography>
              </Grid>

              <Grid xs={4} sm={4} md={4} lg={4}>
                <Typography>Discount</Typography>
              </Grid>
              <Grid xs={4} sm={4} md={4} lg={4}>
                <Typography>:</Typography>
              </Grid>

              <Grid xs={4} sm={4} md={4} lg={4}>
                <Typography>10%</Typography>
              </Grid>
              <Grid xs={4} sm={4} md={4} lg={4}>
                <Typography>Total</Typography>
              </Grid>
              <Grid xs={4} sm={4} md={4} lg={4}>
                <Typography>:</Typography>
              </Grid>

              <Grid xs={4} sm={4} md={4} lg={4}>
                <Typography>$650</Typography>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </PageLayout>
  );
}

export default Order;
