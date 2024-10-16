import useSWR from "swr";
import { IUserRole } from "../types/userRoleTypes";

export function useOwnedUserRole(trigger = true) {
  const { data, error, isLoading } = useSWR<IUserRole>(
    trigger ? "/user-role/owned" : null,
    {
      dedupingInterval: 1800000,
    }
  );

  return {
    userRole: data,
    isLoading,
    isError: error,
  };
}
