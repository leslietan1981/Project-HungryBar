import type { SxProps, Theme } from "@mui/material/styles";
import { Box, Button, Checkbox, Chip, ListItem, Typography } from "@mui/material";
import { CancelOutlined, DoneAllOutlined } from "@mui/icons-material";

import type { TemplateProps } from "../common/ContractList.tsx";
import OrderListItemWrapper from "./OrderListItemWrapper.tsx";

import { toAmountString } from "../../utils/formatUtils.ts";
import { calcSubtotal, getPendingOrderItemsCount } from "../../utils/calcUtils.ts";
import { dev_useOrders } from "../../dev-helpers/dev_useOrders.ts";
import { OrderListItemSx } from "../../sx/staffUI/OrderListItemSxs.ts";
import type { OrderResponse } from "../../types/api/order.types.ts";
import { isStrikethroughSx } from "../../sx/strikethroughSx.ts";

const AcceptedOrderListItemSx = {
  itemLayout: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.8rem",
  },
  checkbox: {
    mt: "-0.4rem",
    ml: "-0.8rem",
  },
} satisfies Record<string, SxProps<Theme>>;

const AcceptedOrderListItem = ({ sx, data }: TemplateProps<OrderResponse>) => {
  const { id, items } = data;
  const pendingItemsCount = getPendingOrderItemsCount(data);
  const { updateOrderItemServedStatus } = dev_useOrders("orders");
  const allChecked = items.every(({ is_served }) => is_served === true);
  const { updateOrderStatus } = dev_useOrders("orders");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateOrderItemServedStatus(data.id, e.target.name, e.target.checked);
  };

  return (
    <OrderListItemWrapper
      sx={sx}
      data={data}
      tagLabel="Accepted"
      tagColor="tagBlueAlt"
      footer={
        <Box sx={OrderListItemSx.footerContainer}>
          <Button
            disabled={!allChecked}
            disableElevation
            variant="contained"
            color="primary"
            startIcon={<DoneAllOutlined />}
            sx={OrderListItemSx.primaryButton}
            onClick={() => updateOrderStatus(id, "completed")}
          >
            Complete Order{!allChecked && ` (${pendingItemsCount} pending)`}
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
          <Box sx={AcceptedOrderListItemSx.itemLayout}>
            <Checkbox
              sx={AcceptedOrderListItemSx.checkbox}
              name={item.item_id}
              checked={item.is_served}
              onChange={handleChange}
            />
            <Box sx={OrderListItemSx.itemContainer}>
              <Typography sx={[OrderListItemSx.quantity, item.is_served && isStrikethroughSx]}>
                {item.quantity}
              </Typography>
              <Box sx={OrderListItemSx.infoContainer}>
                <Typography sx={[OrderListItemSx.title, item.is_served && isStrikethroughSx]}>{item.name}</Typography>
                <Typography sx={[OrderListItemSx.body, item.is_served && isStrikethroughSx]}>
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
          </Box>
          <Box sx={OrderListItemSx.divider} />
        </ListItem>
      ))}
    </OrderListItemWrapper>
  );
};

export default AcceptedOrderListItem;
