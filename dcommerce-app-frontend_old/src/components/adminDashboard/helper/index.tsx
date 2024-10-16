import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CircularProgress from "@material-ui/core/CircularProgress";

const getStartIcon = (loading: boolean, mode?: string) => {
  if (loading) {
    return (
      <CircularProgress style={{ marginLeft: 0, marginRight: 8 }} size={20} />
    );
  }
  if (mode === "edit") {
    return <EditIcon />;
  }
  return <SaveIcon />;
};

export default getStartIcon;
