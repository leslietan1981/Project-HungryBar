import { Box, Chip, ListItem, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import type { TemplateProps } from "../common/ContractList.tsx";
import OrderListItemWrapper from "./OrderListItemWrapper.tsx";

import { OrderListItemSx } from "../../sx/staffUI/OrderListItemSxs.ts";
import { toAmountString } from "../../utils/formatUtils.ts";
import { calcSubtotal } from "../../utils/calcUtils.ts";
import type { OrderResponse } from "../../types/api/order.types.ts";

const CompletedOrderListItemSx = {
  checkedText: {
    color: "text.disabled",
    textDecoration: "line-through",
  },
} satisfies Record<string, SxProps<Theme>>;

const CompletedOrderListItem = ({ sx, data }: TemplateProps<OrderResponse>) => {
  const { items } = data;

  return (
    <OrderListItemWrapper sx={sx} data={data} tagLabel="Completed" tagColor="tagGreenAlt">
      {items.map((item) => (
        <ListItem key={item.item_id} disableGutters disablePadding sx={OrderListItemSx.itemWrapper}>
          <Box sx={OrderListItemSx.itemContainer}>
            <Typography sx={[OrderListItemSx.quantity, item.is_served && CompletedOrderListItemSx.checkedText]}>
              {item.quantity}
            </Typography>
            <Box sx={OrderListItemSx.infoContainer}>
              <Typography sx={[OrderListItemSx.title, item.is_served && CompletedOrderListItemSx.checkedText]}>
                {item.name}
              </Typography>
              <Typography sx={[OrderListItemSx.body, item.is_served && CompletedOrderListItemSx.checkedText]}>
                {item.options.length > 0
                  ? item.options
                      .reduce((accumul: string[], { description }) => {
                        accumul.push(description);
                        return accumul;
                      }, [])
                      .join(", ")
                  : "-"}
              </Typography>
            </Box>
            {item.is_served && <Chip label="Served" color="tagGreenAlt" size="small" />}
            <Typography sx={OrderListItemSx.price}>
              {toAmountString(calcSubtotal(item.price, item.options, item.quantity))}
            </Typography>
          </Box>
          <Box sx={OrderListItemSx.divider} />
        </ListItem>
      ))}
    </OrderListItemWrapper>
  );
};

export default CompletedOrderListItem;
