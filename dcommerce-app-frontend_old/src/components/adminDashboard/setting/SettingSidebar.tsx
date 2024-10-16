import { ListItem } from "@material-ui/core";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import { IconButton, Slide } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const listItems = [
  {
    name: "General",
    path: "/admin_dashboard/setting/general",
  },
  {
    name: "Mail",
    path: "/admin_dashboard/setting/mail",
  },
];

function SettingSidebar() {
  const location = useLocation();
  const path = location.pathname;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const matches = useMediaQuery("(max-width:600px)");
  return (
    <>
      <IconButton>
        <MoreVertIcon
          onClick={() => setMobileOpen(!mobileOpen)}
          className="setting-toggle-menu-icon"
          sx={{ marginLeft: "-1rem" }}
        />
      </IconButton>
      <div className="setting-sidebar ">
        {matches ? (
          <Slide
            className="setting-sidebar-toggel"
            direction="down"
            in={mobileOpen}
            unmountOnExit
            timeout={400}
            appear={false}
          >
            <Stack direction="column">
              <List>
                {listItems.map((item) => (
                  <ListItem
                    button
                    key={item.name}
                    style={{ marginBottom: "2rem" }}
                    component={Link}
                    to={item.path}
                    selected={item.path === path}
                  >
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
              </List>
            </Stack>
          </Slide>
        ) : (
          <Stack direction="column">
            <List>
              {listItems.map((item) => (
                <ListItem
                  button
                  key={item.name}
                  style={{ marginBottom: "2rem" }}
                  component={Link}
                  to={item.path}
                  selected={item.path === path}
                >
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </Stack>
        )}
      </div>
    </>
  );
}

export default SettingSidebar;
