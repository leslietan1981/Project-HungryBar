import { Box, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { useDeviceMode } from "../hooks/useDeviceMode.ts";

const TabletFrameSx = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "#e4e1db",
    minHeight: "100vh",
  },
  chrome: {
    position: "relative",
    aspectRatio: "1194 / 834",
    width: "min(1194px, 90vw)",
    height: "min(834px, 88vh)",
    bgcolor: "#000000",
    borderRadius: "36px",
    p: "16px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
  },
  camera: {
    position: "absolute",
    top: "50%",
    left: "10px",
    transform: "translateY(-50%)",
    zIndex: 10,
    pointerEvents: "none",
    width: "10px",
    height: "10px",
    bgcolor: "#111",
    borderRadius: "50%",
  },
  content: {
    width: "100%",
    height: "100%",
    borderRadius: "22px",
    overflow: "hidden",
    position: "relative",
    bgcolor: "background.default",
  },
  unsupported: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    width: "100%",
    height: "100vh",
    textAlign: "center",
    px: 4,
    bgcolor: "background.default",
  },
} satisfies Record<string, SxProps<Theme>>;

interface TabletFrameProps {
  children?: React.ReactNode;
}

const TabletFrame = ({ children }: TabletFrameProps) => {
  const { mode } = useDeviceMode();

  if (mode === "mobile") {
    return (
      <Box sx={TabletFrameSx.unsupported}>
        <Typography variant="h6">Screen too small</Typography>
        <Typography variant="body2" color="text.secondary">
          This view is optimised for tablet and desktop. Please use a larger screen or rotate your device.
        </Typography>
      </Box>
    );
  }

  if (mode === "tablet") {
    return <Box sx={{ width: "100%", height: "100vh" }}>{children}</Box>;
  }

  // desktop — bezel mockup
  return (
    <Box sx={TabletFrameSx.wrapper}>
      <Box sx={TabletFrameSx.chrome}>
        <Box sx={TabletFrameSx.content}>{children}</Box>
        <Box sx={TabletFrameSx.camera} />
      </Box>
    </Box>
  );
};

export default TabletFrame;
