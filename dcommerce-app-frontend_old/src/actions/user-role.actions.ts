import { AxiosResponse } from "axios";
import API from "../service/API";
import { AppDispatch } from "../store";
import { userRoleActions } from "../store/user-role.slice";

// eslint-disable-next-line import/prefer-default-export
export function fetchOwnedUserRoleAsync() {
  return async (dispatch: AppDispatch) => {
    dispatch(userRoleActions.userRoleFetchStart());
    try {
      const res: AxiosResponse = await API.get(`user-role/owned`);
      dispatch(userRoleActions.userRoleFetchSuccess(res?.data));
    } catch (error: any) {
      dispatch(
        userRoleActions.userRoleFetchError(
          error.message ?? "Failed to fetch user roles"
        )
      );
    }
  };
}
