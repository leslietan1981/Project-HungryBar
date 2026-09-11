import { Box, Card, Chip, List, ListItem, Typography } from "@mui/material";
import type { ChipProps, ListItemProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { AccessTimeOutlined, TableBarOutlined } from "@mui/icons-material";

import { getOrderItemsCount, getOrderTotals } from "../../utils/calcUtils.ts";
import { getTimeFromISODate, toAmountString } from "../../utils/formatUtils.ts";
import { animFadeAndSlideIn } from "../../transitions/transitionStyles.ts";
import type { OrderResponse } from "../../types/api/order.types.ts";
import { body2CSx, title1CSx, title3CSx } from "../../sx/typographySx.ts";

const OrderListItemWrapperSx = {
  base: {
    width: "100%",
    bgcolor: "surface.lighter",
    pb: "1.6rem",
  },
  headerLayout: {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    py: "0.8rem",
    px: "1.6rem",
  },
  tag: {
    fontWeight: 600,
    px: "0.2rem",
  },
  itemList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
    px: "1.6rem",
  },
  divider: {
    width: "100%",
    height: "1px",
    bgcolor: "border.main",
  },
  rowContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    pt: "0.8rem",
    px: "1.6rem",
  },
  spacerMarginRight: {
    mr: "auto",
  },
  footer: {
    pt: "0.8rem",
    px: "1.6rem",
  },
} satisfies Record<string, SxProps<Theme>>;

interface OrderListItemWrapper extends ListItemProps {
  data: OrderResponse;
  tagLabel?: string;
  tagColor?: ChipProps["color"];
  footer?: React.ReactNode;
}

const OrderListItemWrapper = ({ sx, children, data, tagLabel, tagColor, footer }: OrderListItemWrapper) => {
  const { table, created_at } = data;
  const itemsCount = getOrderItemsCount(data);
  const totals = getOrderTotals(data);

  return (
    <ListItem disableGutters disablePadding sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      <Card elevation={0} sx={[OrderListItemWrapperSx.base, animFadeAndSlideIn("up", "2px", 400)]}>
        <Box sx={OrderListItemWrapperSx.headerLayout}>
          <Typography sx={title1CSx}>{`#${data.id}`}</Typography>
          <Chip
            icon={<TableBarOutlined />}
            label={`Table ${table}`}
            size="small"
            color="secondary"
            sx={OrderListItemWrapperSx.tag}
          />
          <Chip
            icon={<AccessTimeOutlined />}
            label={getTimeFromISODate(created_at)}
            size="small"
            color="secondary"
            sx={[OrderListItemWrapperSx.tag, OrderListItemWrapperSx.spacerMarginRight]}
          />
          {tagLabel && tagColor && (
            <Chip label={tagLabel} size="small" color={tagColor} sx={OrderListItemWrapperSx.tag} />
          )}
        </Box>
        <List disablePadding sx={OrderListItemWrapperSx.itemList}>
          <Box sx={OrderListItemWrapperSx.divider} />
          {children}
        </List>
        <Box sx={OrderListItemWrapperSx.rowContainer}>
          <Typography sx={[body2CSx, OrderListItemWrapperSx.spacerMarginRight]}>{`${itemsCount} items`}</Typography>
          <Typography sx={body2CSx}>Total</Typography>
          <Typography sx={title3CSx}>{toAmountString(totals.subtotal)}</Typography>
        </Box>
        {footer && <Box sx={OrderListItemWrapperSx.footer}>{footer}</Box>}
      </Card>
    </ListItem>
  );
};

export default OrderListItemWrapper;
