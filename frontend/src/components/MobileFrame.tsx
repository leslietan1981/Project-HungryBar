import { createContext, useContext } from "react";

import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import { useDeviceMode } from "../hooks/useDeviceMode.ts";

const MobileFrameSx = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "#e4e1db",
    minHeight: "100vh",
  },
  chrome: {
    position: "relative",
    aspectRatio: "393 / 852",
    width: "min(390px, 90vw)",
    height: "min(852px, 88vh)",
    bgcolor: "#000000",
    borderRadius: "55px",
    p: "14px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
  },
  island: {
    position: "absolute",
    top: "26px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
    pointerEvents: "none",
    width: "104px",
    height: "32px",
    bgcolor: "#000",
    borderRadius: "20px",
  },
  content: {
    width: "100%",
    height: "100%",
    borderRadius: "38px",
    overflowY: "auto",
    overflowX: "hidden",
    position: "relative",
    WebkitOverflowScrolling: "touch",
    bgcolor: "background.default",
  },
  indicator: {
    position: "absolute",
    bottom: "18px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
    width: "134px",
    height: "5px",
    bgcolor: "#ccc",
    borderRadius: "3px",
    mixBlendMode: "difference",
    backdropFilter: "grayscale(1) contrast(100)",
  },
} satisfies Record<string, SxProps<Theme>>;

export const MobileFrameConfig = {
  top: "58px",
  bottom: "18px",
};

const MobileFrameContext = createContext<boolean>(false);
export const useMobileFrameContext = () => useContext(MobileFrameContext);

interface MobileFrameProps {
  children?: React.ReactNode;
}

const MobileFrame = ({ children }: MobileFrameProps) => {
  const { isMobile } = useDeviceMode();

  if (isMobile) {
    return <Box sx={{ width: "100%", height: "100vh" }}>{children}</Box>;
  }
  return (
    <Box sx={MobileFrameSx.wrapper}>
      <Box sx={MobileFrameSx.chrome}>
        <Box sx={MobileFrameSx.content}>{children}</Box>
        <Box sx={MobileFrameSx.island} />
        <Box sx={MobileFrameSx.indicator} />
      </Box>
    </Box>
  );
};

export default MobileFrame;
