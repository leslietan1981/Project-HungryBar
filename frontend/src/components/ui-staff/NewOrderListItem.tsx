import { Box, Button, ListItem, Typography } from "@mui/material";
import { AddTaskOutlined, CancelOutlined } from "@mui/icons-material";

import type { TemplateProps } from "../common/ContractList.tsx";
import OrderListItemWrapper from "./OrderListItemWrapper.tsx";

import { toAmountString } from "../../utils/formatUtils.ts";
import { calcSubtotal } from "../../utils/calcUtils.ts";
import { dev_useOrders } from "../../dev-helpers/dev_useOrders.ts";
import { OrderListItemSx } from "../../sx/staffUI/OrderListItemSxs.ts";
import type { OrderResponse } from "../../types/api/order.types.ts";

const NewOrderListItem = ({ sx, data }: TemplateProps<OrderResponse>) => {
  const { id, items } = data;
  const { updateOrderStatus } = dev_useOrders("orders");

  return (
    <OrderListItemWrapper
      sx={sx}
      data={data}
      tagLabel="New"
      tagColor="tagYellowAlt"
      footer={
        <Box sx={OrderListItemSx.footerContainer}>
          <Button
            disableElevation
            variant="contained"
            color="primary"
            startIcon={<AddTaskOutlined />}
            sx={OrderListItemSx.primaryButton}
            onClick={() => updateOrderStatus(id, "accepted")}
          >
            Accept Order
          </Button>
          <Button
            disableElevation
            variant="outlined"
            startIcon={<CancelOutlined />}
            onClick={() => updateOrderStatus(id, "voided")}
          >
            Void
          </Button>
        </Box>
      }
    >
      {items.map((item) => (
        <ListItem key={item.item_id} disableGutters disablePadding sx={OrderListItemSx.itemWrapper}>
          <Box sx={OrderListItemSx.itemContainer}>
            <Typography sx={OrderListItemSx.quantity}>{item.quantity}</Typography>
            <Box sx={OrderListItemSx.infoContainer}>
              <Typography sx={OrderListItemSx.title}>{item.name}</Typography>
              <Typography sx={OrderListItemSx.body}>
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

export default NewOrderListItem;
