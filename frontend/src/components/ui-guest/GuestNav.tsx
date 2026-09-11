import { useCallback, useRef, useState } from "react";

import { Badge, Box, Button, Paper, type BoxProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import { body2CSx } from "../../sx/typographySx.ts";

const GuestNavSx = {
  wrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  container: {
    background: (theme) =>
      `linear-gradient(to top, ${theme.palette.surface.main} 60%, ${alpha(theme.palette.surface.main, 0.8)})`,
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    borderRadius: 0,
    border: "1px solid",
    borderColor: "border.main",
  },
  layout: {
    display: "flex",
    width: "100%",
    position: "relative",
  },
  button: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    borderRadius: 0,
    py: "0.5rem",
    ...body2CSx,
    zIndex: 1,
    "&:hover": {
      color: "secondary.contrastText",
    },
  },
  selected: {
    pointerEvents: "none",
    color: "textColor.subtitle",
  },
  selectedDot: {
    mt: ".3rem",
    bgcolor: "textColor.subtitle",
    width: ".3rem",
    height: ".3rem",
    borderRadius: "99px",
  },
} satisfies Record<string, SxProps<Theme>>;

export interface GuestNavItem {
  value: string;
  icon: React.ReactNode;
  label?: string;
}

interface GuestNavProps extends BoxProps {
  navData: GuestNavItem[];
  paperSx?: SxProps;
  onNavigate?: (value: string) => void;
  activeIdx?: number;
  badges?: Record<string, number>;
}

const GuestNav = ({ ref, sx, navData, paperSx, onNavigate, activeIdx: ctrlActiveIdx, badges }: GuestNavProps) => {
  const [localActiveIdx, setLocalActiveIdx] = useState<number>(0);
  const isControlled = ctrlActiveIdx !== undefined;
  const activeIdx = isControlled ? ctrlActiveIdx : localActiveIdx;
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const setButtonRef = useCallback((el: HTMLButtonElement | null, idx: number) => {
    buttonRefs.current[idx] = el;
  }, []);

  const handleClick = (value: string, idx: number): void => {
    if (!isControlled) setLocalActiveIdx(idx);
    if (onNavigate !== undefined) onNavigate(value);
  };

  return (
    <Box ref={ref} sx={[GuestNavSx.wrapper, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Paper sx={[GuestNavSx.container, ...(Array.isArray(paperSx) ? paperSx : [paperSx])]}>
        <Box sx={GuestNavSx.layout}>
          {navData.map((navItem: GuestNavItem, idx: number) => (
            <Button
              key={idx}
              ref={(el) => setButtonRef(el, idx)}
              disableElevation
              variant="text"
              sx={[GuestNavSx.button, activeIdx === idx && GuestNavSx.selected]}
              onClick={() => handleClick(navItem.value, idx)}
            >
              {badges && navItem.value in badges ? (
                <Badge badgeContent={badges[navItem.value]} color="primary">
                  {navItem.icon}
                </Badge>
              ) : (
                navItem.icon
              )}
              {navItem.label}
              {activeIdx === idx && <Box sx={GuestNavSx.selectedDot} />}
            </Button>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default GuestNav;
