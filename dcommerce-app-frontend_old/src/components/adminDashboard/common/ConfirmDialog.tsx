import React from "react";
import { Box, Modal, Stack } from "@mui/material";

import "./ConfirmDialog.scss";
import { Button } from "@material-ui/core";

interface Props {
  isOpen: boolean;
  title: string;
  // eslint-disable-next-line react/require-default-props
  message?: string;
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
  onPrimaryButtonClick: () => void;
  onSecondaryButtonClick: () => void;
}

function ConfirmDialog({
  isOpen,
  title,
  message = "",
  primaryButtonLabel,
  secondaryButtonLabel,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
}: Props) {
  return (
    <Modal open={isOpen}>
      <Box className="confirm-dialog-wrapper">
        <h4>{title}</h4>
        <p className="message">{message ?? ""}</p>

        <Stack className="actions" direction="row" justifyContent="end">
          <Button
            variant="contained"
            color="primary"
            onClick={onPrimaryButtonClick}
          >
            {primaryButtonLabel}
          </Button>
          <Button
            variant="contained"
            type="button"
            color="secondary"
            onClick={onSecondaryButtonClick}
          >
            {secondaryButtonLabel}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default ConfirmDialog;
