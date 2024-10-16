import React from "react";
import { Grid, Box, IconButton, Button } from "@material-ui/core";
import { Stack, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface IPageLayoutProps {
  title: string;
  action?: string;
  onActionClickHandler?: () => void;
  children: React.ReactElement;
}
function PageLayout({
  title,
  action,
  onActionClickHandler,
  children,
}: IPageLayoutProps) {
  return (
    <Grid className="page-layout">
      <Box
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "1em",
        }}
      >
        <Stack direction="row">
          <IconButton
            className="sidebar-toggle-btn"
            color="inherit"
            edge="start"
          >
            <MenuIcon />
          </IconButton>

          <Typography sx={{ m: 1 }} variant="h6">
            {title}
          </Typography>
        </Stack>

        {action && (
          <Button
            color="primary"
            variant="contained"
            onClick={onActionClickHandler}
          >
            {action}
          </Button>
        )}
      </Box>

      <Box style={{ width: "100%", overflowX: "auto" }}>{children}</Box>
    </Grid>
  );
}

PageLayout.defaultProps = {
  action: undefined,
  onActionClickHandler: undefined,
};

export default PageLayout;
