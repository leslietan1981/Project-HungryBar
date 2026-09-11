import type { SxProps, Theme } from "@mui/material/styles";

export const extraBig1Sx = {
  fontSize: "2rem",
  fontWeight: 400,
  letterSpacing: 0,
} satisfies SxProps<Theme>;

export const extraBig1CSx = {
  ...extraBig1Sx,
  color: "textColor.title",
} satisfies SxProps<Theme>;

export const title1Sx = {
  fontSize: "1.5rem",
  fontWeight: 600,
  letterSpacing: 0,
} satisfies SxProps<Theme>;

export const title1CSx = {
  ...title1Sx,
  color: "textColor.title",
} satisfies SxProps<Theme>;

export const title2Sx = {
  fontSize: "1.25rem",
  fontWeight: 500,
  letterSpacing: ".1em",
  textIndent: ".1em",
  textTransform: "uppercase",
} satisfies SxProps<Theme>;

export const title2CSx = {
  ...title2Sx,
  color: "primaryAlt.main",
} satisfies SxProps<Theme>;

export const title3Sx = {
  fontSize: "1.2rem",
  fontWeight: 600,
} satisfies SxProps<Theme>;

export const title3CSx = {
  ...title3Sx,
  color: "textColor.subtitle",
} satisfies SxProps<Theme>;

export const subtitle1Sx = {
  fontSize: "1rem",
  fontWeight: 600,
  letterSpacing: "0.00938em",
} satisfies SxProps<Theme>;

export const subtitle1CSx = {
  ...subtitle1Sx,
  color: "textColor.title",
} satisfies SxProps<Theme>;

export const subtitle2Sx = {
  fontSize: "1rem",
  fontWeight: 600,
  letterSpacing: "0.00938em",
} satisfies SxProps<Theme>;

export const subtitle2CSx = {
  ...subtitle2Sx,
  color: "textColor.subtitle",
} satisfies SxProps<Theme>;

export const subtitle2CAltSx = {
  ...subtitle2Sx,
  color: "primaryAlt.main",
} satisfies SxProps<Theme>;

export const body1Sx = {
  fontSize: "1rem",
  fontWeight: 400,
  letterSpacing: "0.00938em",
} satisfies SxProps<Theme>;

export const body1CSx = {
  ...body1Sx,
  color: "textColor.body2",
} satisfies SxProps<Theme>;

export const body1CAltSx = {
  ...body1Sx,
  color: "textColor.body1",
} satisfies SxProps<Theme>;

export const body2Sx = {
  fontSize: "0.8rem",
  fontWeight: 400,
  letterSpacing: "0.00938em",
} satisfies SxProps<Theme>;

export const body2CSx = {
  ...body2Sx,
  color: "textColor.body2",
} satisfies SxProps<Theme>;

export const labelSx = {
  fontSize: "0.8rem",
  fontWeight: 400,
  letterSpacing: 0,
} satisfies SxProps<Theme>;

export const svgLabelSx = {
  ...labelSx,
  scrollSnapAlign: "start",
  "& .MuiChip-icon": {
    fontSize: "1.2rem",
    ml: 1.5,
  },
} satisfies SxProps<Theme>;

export const captionSx = {
  fontSize: "0.75rem",
  fontWeight: 400,
  letterSpacing: "0.03333em",
} satisfies SxProps<Theme>;

export const warningCaptionSx = {
  ...captionSx,
  color: "warning.main",
} satisfies SxProps<Theme>;
