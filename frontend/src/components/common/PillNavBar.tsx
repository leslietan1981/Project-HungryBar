import { Box, Button, Typography, type BoxProps, type ButtonProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import InlineBadge from "./InlineBadge.tsx";

export const PillNavBarSx = {
  tabContainer: {
    display: "flex",
    gap: "0.4rem",
    bgcolor: "secondary.light",
    borderRadius: "999px",
    p: "0.2rem",
    maxWidth: "fit-content",
  },
  tabButton: {
    borderRadius: "999px",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    p: "0.4rem 1.2rem",
  },
  tabBadge: {
    minWidth: "0.8rem",
    height: "0.8rem",
    p: "0.28rem",
    fontSize: "0.8rem",
  },
} satisfies Record<string, SxProps<Theme>>;

export interface PillNavItem {
  value: string;
  icon?: React.ReactNode;
  label: string;
}

interface PillNavBarProps extends BoxProps {
  navData: PillNavItem[];
  badges?: Record<string, number>;
  onNavigate?: (path: string) => void;
  setSelected?: (navItem: PillNavItem) => boolean;
}

const PillNavBar = ({ sx, navData, badges, onNavigate, setSelected = () => false }: PillNavBarProps) => {
  const getButtonProps = (isSelected: boolean) => {
    const props: ButtonProps = {
      variant: isSelected ? "contained" : "text",
      color: isSelected ? "primary" : "secondaryAlt",
      sx: PillNavBarSx.tabButton,
    };
    return props;
  };

  return (
    <Box sx={[PillNavBarSx.tabContainer, ...(Array.isArray(sx) ? sx : [sx])]}>
      {navData.map((navItem, idx) => {
        const isSelected = setSelected(navItem);
        return (
          <Button
            key={idx}
            disableElevation
            {...getButtonProps(isSelected)}
            onClick={() => onNavigate?.(navItem.value)}
          >
            {navItem.icon}
            <Typography>{navItem.label}</Typography>
            {badges && navItem.value in badges && (
              <InlineBadge
                value={badges[navItem.value]}
                color={isSelected ? "primaryContrast" : "primary"}
                sx={PillNavBarSx.tabBadge}
              />
            )}
          </Button>
        );
      })}
    </Box>
  );
};

export default PillNavBar;
