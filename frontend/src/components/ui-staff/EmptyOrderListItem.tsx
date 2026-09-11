import { Avatar, Box, Card, ListItem, Typography, type ListItemProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { animFadeAndSlideIn } from "../../transitions/transitionStyles.ts";

const EmptyOrderListItemSx = {
  wrapper: {
    flex: 1,
  },
  base: {
    width: "100%",
    height: "100%",
    bgcolor: "surface.lighter",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: ".4rem",
    py: "0.8rem",
    px: "1.6rem",
  },
  brand: {
    fontFamily: "Playfair Display, serif",
    fontWeight: "400",
    fontSize: "2rem",
    color: "textColor.body2",
    borderRadius: "0.4rem",
    border: "1px solid",
    borderColor: "border.main",
    width: "3rem",
    height: "3rem",
    background: "transparent",
  },
  body: {
    color: "textColor.body2",
    fontSize: "0.8rem",
  },
} satisfies Record<string, SxProps<Theme>>;

interface EmptyOrderListItemProps extends ListItemProps {
  message?: string;
}

const EmptyOrderListItem = ({ sx, message }: EmptyOrderListItemProps) => {
  return (
    <ListItem disableGutters disablePadding sx={[EmptyOrderListItemSx.wrapper, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Card elevation={0} sx={[EmptyOrderListItemSx.base, animFadeAndSlideIn("up", "2px", 400)]}>
        <Box sx={EmptyOrderListItemSx.container}>
          <Avatar sx={EmptyOrderListItemSx.brand}>餓</Avatar>
          <Typography sx={EmptyOrderListItemSx.body}>{message}</Typography>
        </Box>
      </Card>
    </ListItem>
  );
};

export default EmptyOrderListItem;
