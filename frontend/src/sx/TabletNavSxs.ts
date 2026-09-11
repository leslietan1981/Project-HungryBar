import type { SxProps, Theme } from "@mui/material/styles";
import { body2CSx } from "./typographySx.ts";

export const TabletNavSx = {
  wrapper: {
    width: "100%",
  },
  layout: {
    display: "flex",
    justifyContent: "space-between",
    bgcolor: "surface.lighter",
    p: "0.8rem 1.6rem",
  },
  column: {
    display: "flex",
    alignItems: "center",
    gap: "1.2rem",
  },
  columnDivider: {
    width: "1px",
    height: "60%",
    bgcolor: "border.main",
  },
  motivation: {
    ...body2CSx,
    fontStyle: "italic",
  },
} satisfies Record<string, SxProps<Theme>>;
