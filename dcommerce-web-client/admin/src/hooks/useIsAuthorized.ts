import { useOwnedUserRole } from "./userRoleHooks";

export function useIsAuthorizedTo(actionPermission: string) {
  const { isLoading, userRole, isError } = useOwnedUserRole();

  if (isError || isLoading) {
    return false;
  }

  return userRole?.permissions.includes(actionPermission);
}
