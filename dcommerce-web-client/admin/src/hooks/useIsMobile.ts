import { useMediaQuery } from "@mui/material";

export function useIsMobile() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return {
    isMobile,
  };
}
