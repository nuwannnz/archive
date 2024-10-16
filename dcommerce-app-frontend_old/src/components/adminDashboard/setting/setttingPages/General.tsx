import { Avatar, TextField, Typography } from "@material-ui/core";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

import React from "react";

function General() {
  return (
    <Grid
      container
      columnSpacing={{ lg: 1 }}
      direction={{
        lg: "row",
        md: "column-reverse",
        sm: "column-reverse",
        xs: "column-reverse",
      }}
    >
      <Grid
        lg={8}
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        flexWrap="wrap"
        gap={3}
      >
        <Grid>
          <Typography>First Name</Typography>
          <TextField variant="outlined" size="small" />
        </Grid>
        <Grid>
          <Typography>Last Name</Typography>
          <TextField variant="outlined" size="small" />
        </Grid>
        <Grid>
          <Typography>Emai</Typography>
          <TextField variant="outlined" size="small" />
        </Grid>
        <Grid>
          <Typography>Phone</Typography>
          <TextField variant="outlined" size="small" />
        </Grid>
        <Grid lg={12}>
          <Typography>Address</Typography>
          <TextField variant="outlined" size="small" fullWidth />
        </Grid>
        <Grid xs={12} lg={6} md={10} sm={12}>
          <Typography>Birthday</Typography>
          <TextField type="date" variant="outlined" size="small" fullWidth />
        </Grid>
        <Grid lg={5} />

        <Grid>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </Grid>

        <Divider />
      </Grid>

      <Grid
        lg={4}
        container
        gap={{ lg: 2, md: 2, sm: 3, xs: 2 }}
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        marginTop={{ md: 3, sm: 3 }}
      >
        <Avatar style={{ width: 150, height: 150 }} />

        <Button
          type="submit"
          variant="outlined"
          color="primary"
          sx={{ marginBottom: { xs: "3rem" } }}
          startIcon={<CameraAltIcon />}
        >
          Upload Image
        </Button>
      </Grid>
    </Grid>
  );
}

export default General;
