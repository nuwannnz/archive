/* eslint-disable no-unused-vars */
import { Box } from "@material-ui/core";
import React from "react";
import "./Header.css";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useLocation } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import SearchBar from "../SearchBar/SearchBar";

const listItems = [
  {
    name: "Coming Soon",
    path: "/admin_dashboard/product_category_list",
  },
  {
    name: "Offers",
    path: "/admin_dashboard/product_category_list",
  },
  {
    name: "Pre-Orders",
    path: "/admin_dashboard/product_category_list",
  },
  {
    name: "New Arrivals",
    path: "/admin_dashboard/product_category_list",
  },
  {
    name: "Audio",
    path: "/admin_dashboard/product_category_list",
  },
  {
    name: "Gaming Consoles",
    path: "/admin_dashboard/product_category_list",
  },
  {
    name: "Video Games",
    path: "/admin_dashboard/product_category_list",
  },
  {
    name: "Accessories",
    path: "/admin_dashboard/product_category_list",
  },
  {
    name: "Toys",
    path: "/admin_dashboard/product_category_list",
  },
  {
    name: "Tech News",
    path: "/admin_dashboard/product_category_list",
  },
];
function Header() {
  const matches = useMediaQuery("(max-width:1200px)");
  const location = useLocation();
  const path = location.pathname;
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <div>
      <List>
        {listItems.map((item) => (
          <ListItem
            button
            key={item.name}
            sx={{ marginBottom: "2rem" }}
            component={Link}
            to={item.path}
            selected={item.path === path}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    // eslint-disable-next-line react/self-closing-comp
    <Box style={{ width: "100%" }}>
      <div className="sidebar-header">
        <Drawer
          open={drawerOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: {
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "20rem",
              },
            },
          }}
          variant="temporary"
          anchor="left"
        >
          {drawer}
        </Drawer>
      </div>
      {matches ? (
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          className="header"
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            className="header-container"
          >
            <Grid
              container
              justifyContent="flex-start"
              style={{
                width: "100%",
                backgroundColor: "#47d177",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                Logo
                <IconButton onClick={handleDrawerToggle}>
                  <MenuIcon />
                </IconButton>
              </div>

              <div>Icons</div>
            </Grid>

            <Grid
              style={{
                backgroundColor: "white",
                width: "100%",
                marginBottom: "1rem",
              }}
            >
              SearchBar
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              style={{ width: "30rem", backgroundColor: "#38824c" }}
            >
              Navbar
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          className="header"
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            className="header-container"
          >
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <div className="logo" style={{ width: "10rem" }}>
                Logo
              </div>
              <IconButton onClick={handleDrawerToggle}>
                <MenuIcon sx={{ marginRight: "2rem" }} />
              </IconButton>

              <Grid
                style={{
                  width: "35em",
                  backgroundColor: "Background",
                  marginRight: "1rem",
                }}
              >
                <SearchBar />
              </Grid>
              <Grid>Icons</Grid>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            className="navbar"
          >
            Navbar
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default Header;
