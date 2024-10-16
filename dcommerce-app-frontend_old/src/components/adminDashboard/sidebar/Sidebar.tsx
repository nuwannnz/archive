import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CategoryIcon from "@mui/icons-material/Category";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { ROUTES } from "../../../constants/common";

const drawerWidth = 0;

/* sidebar Menu Item */

const listItems = [
  {
    name: "Products Category",
    icon: <CategoryIcon color="primary" />,
    path: ROUTES.PRODUCT_CATEGORIES,
  },
  {
    name: "Products",
    icon: <AssignmentIcon color="primary" />,
    path: ROUTES.PRODUCTS,
  },
  {
    name: "Product Attributes",
    icon: <ContentPasteIcon color="primary" />,
    path: ROUTES.PRODUCT_ATTRIBUTES,
  },
  {
    name: "Orders",
    icon: <ContentPasteIcon color="primary" />,
    path: ROUTES.ORDERS,
  },
  // {
  //   name: "Setting",
  //   icon: <SettingsIcon color="primary" />,
  //   path: "/admin_dashboard/setting/general",
  // },
];

// const useStyles = makeStyles({
//   bottomPush: {
//     position: "fixed",
//     bottom: 0,
//     left: 20,
//     textAlign: "center",
//     padding: 30,
//   },
// });

function Sidebar() {
  // const navigate = useNavigate();
  // const classes = useStyles();
  const location = useLocation();
  const path = location.pathname;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      {/* <Typography variant="h6" mt={3} mb={4} align="center">
        Admin Dashboard
      </Typography>
      <Divider /> */}

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
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
      {/* <div className={classes.bottomPush}>
        <footer>
          <Button
            className="main-button"
            onClick={logout}
            variant="contained"
            size="large"
            color="secondary"
          >
            LogOut
          </Button>
        </footer>
      </div> */}
    </div>
  );

  return (
    /**
     * sidebar
     */

    <div className="sidebar-container">
      <Drawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        variant="temporary"
        anchor="left"
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "18%",
            marginTop: "4rem",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </div>
  );
}

export default Sidebar;
