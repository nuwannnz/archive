import { Box, Grid } from "@material-ui/core";
import React from "react";
import Stack from "@mui/material/Stack";
import Container from "../../../components/customerlayout/Container";
import "./Home.css";

function Home() {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Stack direction="column">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="top-bar"
        >
          Top Bar
        </Grid>
        <Container />
      </Stack>
    </Box>
  );
}

export default Home;
