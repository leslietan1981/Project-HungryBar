import { Box, Card, ListItem, Typography, type ListItemProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import PhCookingPot from "../custom-svgicons/PhCookingPot.tsx";
import { body2CSx, body2Sx, extraBig1CSx, subtitle1CSx } from "../../sx/typographySx.ts";
import type { OrderItemResponse } from "../../types/api/order.types.ts";
import { TaskAltOutlined } from "@mui/icons-material";
import { isStrikethroughSx } from "../../sx/strikethroughSx.ts";

const GuestOrderListItemSx = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
    py: 0,
  },
  base: {
    bgcolor: "transparent",
    borderRadius: 0,
    width: "100%",
  },
  layout: {
    display: "flex",
    gap: "1.6rem",
  },
  quantity: {
    ...extraBig1CSx,
    lineHeight: 1,
  },
  infoContainer: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  title: {
    ...subtitle1CSx,
    lineHeight: 1.2,
  },
  body: {
    ...body2CSx,
    lineHeight: 1.4,
  },
  statusContainer: {
    ml: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomDivider: {
    width: "100%",
    height: "1px",
    bgcolor: "border.main",
  },
} satisfies Record<string, SxProps<Theme>>;

interface GuestOrderListItemProps extends ListItemProps {
  details: OrderItemResponse;
  isLast?: boolean;
}

const GuestOrderListItem = ({ sx, details, isLast }: GuestOrderListItemProps) => {
  const optionsStr = details.options?.map((option) => option.description).join(", ") ?? "";
  const statusColorSx = { color: details.is_served ? "success.main" : "textColor.subtitle" } satisfies SxProps<Theme>;

  return (
    <ListItem sx={[GuestOrderListItemSx.wrapper, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Card elevation={0} sx={GuestOrderListItemSx.base}>
        <Box sx={GuestOrderListItemSx.layout}>
          <Typography sx={[GuestOrderListItemSx.quantity, details.is_served && isStrikethroughSx]}>
            {details.quantity}
          </Typography>
          <Box sx={GuestOrderListItemSx.infoContainer}>
            <Typography sx={[GuestOrderListItemSx.title, details.is_served && isStrikethroughSx]}>
              {details.name}
            </Typography>
            <Typography sx={[GuestOrderListItemSx.body, details.is_served && isStrikethroughSx]}>
              {optionsStr}
            </Typography>
          </Box>
          <Box sx={[GuestOrderListItemSx.statusContainer, statusColorSx]}>
            {details.is_served ? <TaskAltOutlined /> : <PhCookingPot />}
            <Typography sx={body2Sx}>{details.is_served ? "All served" : "Preparing"}</Typography>
          </Box>
        </Box>
      </Card>
      {!isLast && <Box sx={GuestOrderListItemSx.bottomDivider} />}
    </ListItem>
  );
};

export default GuestOrderListItem;
