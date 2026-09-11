import type { SxProps, Theme } from "@mui/material/styles";

export const isStrikethroughSx = {
  color: "text.disabled",
  textDecoration: "line-through",
} satisfies SxProps<Theme>;
