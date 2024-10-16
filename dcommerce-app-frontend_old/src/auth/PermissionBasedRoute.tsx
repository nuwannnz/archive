/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { Auth } from "aws-amplify";
import { IRoute } from "../routes";
import { RootState } from "../store";

interface PermissionBasedRouteProps {
  route: IRoute;
  children: JSX.Element;
}

const PermissionBasedRoute: React.FC<PermissionBasedRouteProps> = ({
  route,
  children,
}) => {
  const [userPermissions, setUserPermissions] = useState<string[] | null>(null);
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);
  const { data: ownedUserRole } = useSelector(
    (state: RootState) => state.userRole.ownedRole
  );

  useEffect(() => {
    if (ownedUserRole) {
      setUserPermissions(ownedUserRole.permissions);
    }
  }, [ownedUserRole]);

  useEffect(() => {
    (async () => {
      try {
        await Auth.currentSession();
        setIsAuthed(true);
      } catch {
        setIsAuthed(false);
      }
    })();
  }, []);

  if (isAuthed === false) {
    return <Navigate to="/admin-auth" replace />;
  }

  if (userPermissions === null) {
    return (
      <div className="spinner">
        <CircularProgress />
      </div>
    );
  }

  if (
    route.permissions.find(
      (permission) => !userPermissions.includes(permission)
    )
  ) {
    return <Navigate to="/admin-auth" replace />;
  }

  return children;
};

export default PermissionBasedRoute;
