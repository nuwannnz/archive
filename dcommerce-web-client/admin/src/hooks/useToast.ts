import { useSnackbar } from "notistack";

export function useToast() {
  const { enqueueSnackbar } = useSnackbar();

  return {
    successToast: (msg: string) => {
      enqueueSnackbar(msg, { variant: "success" });
    },
    errorToast: (msg: string) => {
      enqueueSnackbar(msg, { variant: "error" });
    },
    infoToast: (msg: string) => {
      enqueueSnackbar(msg, { variant: "info" });
    },
    warningToast: (msg: string) => {
      enqueueSnackbar(msg, { variant: "warning" });
    },
  };
}
