import { useState } from "react";
import { useLocation } from "react-router";

import { Avatar, Box, Typography, type BoxProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import { animFadeAndSlideIn } from "../../transitions/transitionStyles.ts";
import { MobileFrameConfig, useMobileFrameContext } from "../MobileFrame.tsx";
import { body1CSx, title1CSx } from "../../sx/typographySx.ts";
import { brandAvatarSx } from "../../sx/avatarSx.ts";

const GuestPageWrapperSx = {
  wrapper: {
    display: "flex",
    height: "100%",
    position: "relative",
  },
  layout: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    color: "primary.main",
    bgcolor: "surface.main",
  },
  header: {
    px: "1.6rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: "1rem",
  },
  headerTextWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  categoryBar: {
    px: "1.6rem",
    scrollPaddingLeft: "1.6rem",
    mb: "1rem",
  },
  content: {
    flexGrow: 1,
    minHeight: 0,
  },
} satisfies Record<string, SxProps<Theme>>;

interface GuestPageWrapperProps extends BoxProps {
  greeting?: string;
  sub?: string;
}

const GuestPageWrapper = ({ sx, children, greeting = "", sub = "" }: GuestPageWrapperProps) => {
  const isMobile = useMobileFrameContext();
  const location = useLocation();
  const [direction] = useState<"left" | "right">(
    () => (location.state as { direction?: "left" | "right" })?.direction ?? "left",
  );
  const entryAnim = animFadeAndSlideIn(direction, 2, 400, { easing: "ease-in-out" });

  return (
    <Box sx={[...(Array.isArray(sx) ? sx : [sx]), GuestPageWrapperSx.wrapper, entryAnim]}>
      <Box sx={[GuestPageWrapperSx.layout]}>
        <Box
          sx={[
            GuestPageWrapperSx.header,
            { pt: isMobile ? "calc(env(safe-area-inset-top, 0px) + 1.6rem)" : MobileFrameConfig.top },
          ]}
        >
          <Box sx={GuestPageWrapperSx.headerTextWrapper}>
            <Typography sx={title1CSx}>{greeting}</Typography>
            <Typography sx={body1CSx}>{sub}</Typography>
          </Box>
          <Avatar sx={brandAvatarSx}>餓</Avatar>
        </Box>
        {children}
      </Box>
    </Box>
  );
};

export default GuestPageWrapper;
