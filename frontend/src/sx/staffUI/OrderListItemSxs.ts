import type { SxProps, Theme } from "@mui/material/styles";

export const OrderListItemSx = {
  itemWrapper: {
    flexDirection: "column",
    gap: "0.8rem",
    alignItems: "unset",
  },
  itemContainer: {
    flex: 1,
    display: "flex",
    gap: "1.6rem",
    alignItems: "flex-start",
  },
  quantity: {
    fontSize: "2rem",
    lineHeight: 1,
  },
  infoContainer: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  title: {
    color: "textColor.title",
    fontWeight: "600",
    lineHeight: 1.2,
  },
  body: {
    color: "textColor.body2",
    fontSize: "0.8rem",
    lineHeight: 1.4,
  },
  price: {
    color: "textColor.subtitle",
    fontWeight: "600",
    lineHeight: 1.2,
  },
  divider: {
    width: "100%",
    height: "1px",
    bgcolor: "border.main",
  },
  footerContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
  },
  primaryButton: {
    flex: 1,
  },
} satisfies Record<string, SxProps<Theme>>;
