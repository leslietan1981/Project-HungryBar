import type { SxProps, Theme } from "@mui/material/styles";

export const brandAvatarSx = {
  fontFamily: "Playfair Display, serif",
  fontWeight: 900,
  color: "common.white",
  bgcolor: "primaryAlt.contrastText",
  border: "1px solid",
  borderColor: "primary.main",
} satisfies SxProps<Theme>;

export const profileAvatarSx = {
  fontSize: "0.8rem",
  fontWeight: 600,
  width: "0.8em",
  height: "0.8em",
  p: "0.8em",
  bgcolor: "secondary.light",
  color: "secondary.contrastText",
} satisfies SxProps<Theme>;
