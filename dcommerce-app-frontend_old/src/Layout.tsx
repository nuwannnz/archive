import React, { useEffect, useState } from "react";
import { Routes, useLocation } from "react-router-dom";
import { CircularProgress, ThemeProvider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Auth } from "aws-amplify";
import { Theme, createTheme } from "@mui/material";
import { blueGrey, lightBlue } from "@material-ui/core/colors";
import SnackbarNotification from "./components/adminDashboard/common/Snackbar";
import { AppDispatch, RootState } from "./store";
import { fetchOwnedUserRoleAsync } from "./actions/user-role.actions";
// import getPublicRoutes from "./auth/PublicRoute";
import defineRoute from "./auth/DefineRoute";
import { handleHeaderHide } from "./util";
import { routeList } from "./routes";
import Header from "./components/customerlayout/Header/Header";
import Footer from "./components/customerlayout/Footer/Footer";

function Layout() {
  const dispatch = useDispatch<AppDispatch>();
  const { pathname } = useLocation();

  const [theme, setTheme] = useState<Theme | null>(null);

  const { isFetching } = useSelector(
    (state: RootState) => state.userRole.ownedRole
  );

  /**
   * To fetch user permissions only if the user is authenticated
   */
  useEffect(() => {
    (async () => {
      try {
        await Auth.currentSession();
        dispatch(fetchOwnedUserRoleAsync());
      } catch {
        /* empty */
      }
    })();
  }, []);

  useEffect(() => {
    // TODO: the colors needs to be fetched from the domain
    setTheme(
      createTheme({
        palette: {
          primary: {
            main: lightBlue[700],
          },
          secondary: {
            main: blueGrey[500],
          },
        },
      })
    );
  }, []);

  if (isFetching || !theme) {
    return (
      <div className="spinner">
        <CircularProgress />
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      {handleHeaderHide(pathname) && <Header />}
      <Routes>
        {/* {getPublicRoutes().map((route) => defineRoute(route))} */}
        {routeList.map((route) => defineRoute(route))}
      </Routes>
      {handleHeaderHide(pathname) && <Footer />}

      <SnackbarNotification />
    </ThemeProvider>
  );
}

export default Layout;
