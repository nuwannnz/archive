import React from "react";
import { Route } from "react-router-dom";
import PermissionBasedRoute from "./PermissionBasedRoute";
import { IRoute } from "../routes";

const defineRoute = (route: IRoute) => (
  <Route
    key={route.key}
    path={route.path}
    element={
      route.permissions.length > 0 ? (
        <PermissionBasedRoute route={route}>
          {route.element}
        </PermissionBasedRoute>
      ) : (
        route.element
      )
    }
  >
    {route.nestedRoutes?.map((nestedRoute) => defineRoute(nestedRoute))}
  </Route>
);

export default defineRoute;
