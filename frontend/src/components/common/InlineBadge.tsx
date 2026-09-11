import { Box, type BoxProps } from "@mui/material";
import type { Palette, SxProps, Theme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

const InlineBadgeSx = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: "99px",
    minWidth: "0.7rem",
    height: "0.7rem",
    p: "0.2rem",
    fontWeight: 600,
    fontSize: "0.7rem",
  },
} satisfies Record<string, SxProps<Theme>>;

interface InlineBadgeProps extends BoxProps {
  value?: number;
  size?: string | number;
  padding?: string | number;
  color?: keyof Palette;
}

const InlineBadge = ({ sx, value, size, padding, color: colorCode = "primary" }: InlineBadgeProps) => {
  const theme = useTheme();
  const colorObj = theme.palette[colorCode];
  const bgcolor =
    colorObj && typeof colorObj === "object" && "main" in colorObj ? colorObj.main : theme.palette.primary.main;
  const color =
    colorObj && typeof colorObj === "object" && "contrastText" in colorObj
      ? colorObj.contrastText
      : theme.palette.primary.contrastText;

  const sxOverrides: SxProps<Theme> = {
    ...(size && { minWidth: size, height: size }),
    ...(padding && { p: padding }),
    bgcolor,
    color,
  };

  return <Box sx={[InlineBadgeSx.container, ...(Array.isArray(sx) ? sx : [sx]), sxOverrides]}>{value}</Box>;
};

export default InlineBadge;
