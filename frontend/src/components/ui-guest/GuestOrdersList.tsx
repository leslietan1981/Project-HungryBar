import { Box, List, ListSubheader, type BoxProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import GuestOrderListItem from "./GuestOrderListItem.tsx";
import { dev_orders } from "../../dev-helpers/devData.ts";

const GuestOrdersListSx = {
  wrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    bgcolor: "surface.lighter",
  },
  list: {
    overflowY: "auto",
    overscrollBehaviorX: "none",
    scrollbarColor: (theme) => theme.palette.scrollbar.main,
    p: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
  },
  subheader: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    bgcolor: "primary.main",
    color: "primary.contrastText",
    lineHeight: 2,
    py: "0.2rem",
    px: "1.6rem",
    fontSize: "1rem",
    "& .MuiSvgIcon-root": {
      fontSize: "1.5rem",
    },
  },
  listItem: {
    px: "1.6rem",
  },
} satisfies Record<string, SxProps<Theme>>;

interface GuestOrdersListProps extends BoxProps {
  paddingBottom?: string;
}

const GuestOrdersList = ({ sx, paddingBottom }: GuestOrdersListProps) => {
  const paddingBottomSx: SxProps<Theme> = paddingBottom ? { pb: paddingBottom } : {};

  return (
    <Box sx={[GuestOrdersListSx.wrapper, ...(Array.isArray(sx) ? sx : [sx])]}>
      <List sx={[GuestOrdersListSx.list, paddingBottomSx]}>
        {dev_orders.map((order, orderIdx) => [
          <ListSubheader key={`order-${orderIdx}`} sx={GuestOrdersListSx.subheader}>
            {`Order #${order.id}`}
          </ListSubheader>,
          order.items.map((item, itemIdx) => {
            const isLast = itemIdx === order.items.length - 1;
            return (
              <GuestOrderListItem
                key={`item-${orderIdx}-${itemIdx}`}
                sx={GuestOrdersListSx.listItem}
                details={item}
                isLast={isLast}
              />
            );
          }),
        ])}
      </List>
    </Box>
  );
};

export default GuestOrdersList;
