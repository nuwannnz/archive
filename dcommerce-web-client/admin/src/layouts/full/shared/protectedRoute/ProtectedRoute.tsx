import React, { useEffect, useState } from "react";
import { useOwnedUserRole } from "../../../../hooks/userRoleHooks";
import { useRouter } from "next/router";
import { ROUTES } from "../../../../config/routes";
import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import { CircularProgress } from "@mui/material";
import CenteredFlexBox from "../../../../components/shared/CenteredFlexBox";

function isAuthorized(
  requiredPermissions: string[],
  availablePermissions: string[]
) {
  const missingPermission = requiredPermissions.find(
    (p) => !availablePermissions.includes(p)
  );

  return missingPermission === undefined;
}

function ProtectedRoute(Component: React.ComponentType, permissions: string[]) {
  return (props: any): EmotionJSX.Element => {
    const { isLoading, userRole, isError } = useOwnedUserRole();
    const router = useRouter();

    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
      if (!userRole) return;
      if (isAuthorized(permissions, userRole.permissions)) {
        setAuthorized(true);
      } else {
        router.push(ROUTES.LOGIN);
      }
    }, [userRole]);

    useEffect(() => {
      if (isError) {
        router.push(ROUTES.LOGIN);
      }
    }, [isError]);

    if (isLoading) {
      return (
        <CenteredFlexBox width="100vw" height="100vh">
          <CircularProgress />
        </CenteredFlexBox>
      );
    }

    if (!authorized) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <Component {...props} />
      </>
    );
  };
}

namespace ProtectedRoute {
  export let getLayout: any;
}

export default ProtectedRoute;
