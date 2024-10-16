import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface INotificationState {
  snackBar: {
    open: boolean;
    type: "success" | "error" | "warning" | "info";
    message: string;
  };
}

const initialState: INotificationState = {
  snackBar: {
    open: false,
    type: "success",
    message: "",
  },
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<any>) => {
      state.snackBar = {
        open: true,
        type: action.payload.type,
        message:
          typeof action.payload.message === "string"
            ? action.payload.message
            : "Something went wrong",
      };
    },

    clearNotification: (state) => {
      state.snackBar = initialState.snackBar;
    },
  },
});

// Export all of the actions:
export const { setNotification, clearNotification } = notificationSlice.actions;

// It is a convention to export reducer as a default export:
export default notificationSlice.reducer;
