import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserRole } from "../types/UserRole";
import { NullableString } from "../types/common";

interface IUserRoleState {
  ownedRole: {
    isFetching: boolean;
    data: IUserRole | null;
    error: NullableString;
  };
}

const initialState: IUserRoleState = {
  ownedRole: {
    isFetching: false,
    data: null,
    error: null,
  },
};

const userRoleSlice = createSlice({
  name: "userRole",
  initialState,
  reducers: {
    userRoleFetchStart: (state) => {
      state.ownedRole = {
        isFetching: true,
        data: null,
        error: null,
      };
    },

    userRoleFetchSuccess: (state, action: PayloadAction<IUserRole>) => {
      state.ownedRole = {
        isFetching: false,
        data: action.payload,
        error: null,
      };
    },

    userRoleFetchError: (state, action: PayloadAction<string>) => {
      state.ownedRole = {
        isFetching: false,
        data: null,
        error: action.payload,
      };
    },

    resetUserRole: (state) => {
      state.ownedRole = initialState.ownedRole;
    },

    logout: () => {
      // To reset redux store
    },
  },
});

export const { actions: userRoleActions, reducer: userRoleReducer } =
  userRoleSlice;
