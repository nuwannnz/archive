import React, { Dispatch, SetStateAction } from "react";
import "./AdminHeader.css";
import { Button } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { userRoleActions } from "../../../store/user-role.slice";

export default function AdminHeader({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Logout handler
   */
  const logout = async () => {
    await Auth.signOut();
    dispatch(userRoleActions.logout());
    navigate("/admin-auth");
  };

  return (
    <div className="admin-header">
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={() => setIsOpen((prev: boolean) => !prev)}
        sx={{
          ml: 2,
          //   display: {
          //     xs: "block",
          //     sm: "none",
          //   },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Typography sx={{ m: 1, p: 1 }} variant="h6">
        Admin Dashboard
      </Typography>
      <Button
        className="log-out-btn"
        onClick={logout}
        variant="text"
        // size="small"
        color="secondary"
      >
        Log Out
      </Button>
    </div>
  );
}
