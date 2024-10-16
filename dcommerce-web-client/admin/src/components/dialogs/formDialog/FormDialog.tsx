import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Stack,
  Box,
} from "@mui/material";
import { useIsMobile } from "../../../hooks/useIsMobile";

interface FormDialogProps {
  isOpen: boolean;
  title: string | JSX.Element;
  loading: boolean;
  children: JSX.Element;
  hidePrimaryButton?: boolean;
  hidePrimaryAddMoreButton?: boolean;
  primaryAddMoreButtonLabel?: string;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  minWidth?: number;
  primaryActionHandler: (closeModalOnSuccess: boolean) => void;
  secondaryActionHandler: () => void;
  closeModal: () => void;
}

const FormDialog: React.FC<FormDialogProps> = ({
  isOpen,
  title,
  loading,
  hidePrimaryButton,
  hidePrimaryAddMoreButton,
  primaryAddMoreButtonLabel,
  primaryButtonLabel,
  secondaryButtonLabel,
  minWidth,
  primaryActionHandler,
  secondaryActionHandler,
  closeModal,
  children,
}) => {
  const { isMobile } = useIsMobile();
  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      PaperProps={{ sx: { minWidth: isMobile ? "95%" : minWidth ?? 600 } }}
    >
      <DialogTitle variant="h4">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions
        sx={{
          justifyContent: "space-between",
          padding: "24px",
        }}
      >
        <Box>{loading && <CircularProgress size={25} />}</Box>
        <Stack direction="row" spacing={1}>
          {!hidePrimaryButton && (
            <Button
              variant="contained"
              disabled={loading}
              onClick={() => primaryActionHandler(true)}
            >
              {primaryButtonLabel ?? "Save"}
            </Button>
          )}
          {!hidePrimaryAddMoreButton && (
            <Button
              variant="contained"
              disabled={loading}
              onClick={() => primaryActionHandler(false)}
            >
              {primaryAddMoreButtonLabel ?? "Save and add more"}
            </Button>
          )}
          <Button
            disabled={loading}
            color="secondary"
            variant="contained"
            onClick={secondaryActionHandler}
          >
            {secondaryButtonLabel ?? "Cancel"}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
