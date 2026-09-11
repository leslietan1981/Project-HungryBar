import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import ContractList from "../common/ContractList.tsx";
import InlineBadge from "../common/InlineBadge.tsx";
import { dev_useOrders } from "../../dev-helpers/dev_useOrders.ts";
import CompletedOrderListItem from "./CompletedOrderListItem.tsx";
import VoidedOrderListItem from "./VoidedOrderListItem.tsx";
import EmptyOrderListItem from "./EmptyOrderListItem.tsx";
import { animFadeAndSlideIn } from "../../transitions/transitionStyles.ts";

const OrdersHistoryPageSx = {
  wrapper: {
    flex: 1,
    display: "flex",
    minHeight: 0,
    gap: "0.8rem",
    pl: "1.6rem",
    pr: "0.8rem",
  },
  headerBadge: {
    minWidth: "0.8rem",
    height: "0.8rem",
    p: "0.28rem",
    fontSize: "0.8rem",
  },
  listWrapper: {
    flex: 1,
  },
  listContainer: {
    pt: "0.4rem",
    pr: "0.8rem",
    pb: "1.6rem",
  },
  listHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    py: "0.8rem",
    bgcolor: "surface.main",
    color: "textColor.title",
    fontWeight: 600,
    fontSize: "1.2rem",
  },
} satisfies Record<string, SxProps<Theme>>;

const OrdersHistoryPage = () => {
  const { getOrdersByOrderState } = dev_useOrders("orders");
  const completedOrders = getOrdersByOrderState("completed");
  const voidedOrders = getOrdersByOrderState("voided");

  return (
    <Box sx={[OrdersHistoryPageSx.wrapper, animFadeAndSlideIn("up", "2px", 400)]}>
      <ContractList
        header={
          <Box sx={OrdersHistoryPageSx.listHeader}>
            Completed Orders
            <InlineBadge value={completedOrders.length} color="tagGreen" sx={OrdersHistoryPageSx.headerBadge} />
          </Box>
        }
        emptyDefault={<EmptyOrderListItem message="No completed orders" />}
        Template={CompletedOrderListItem}
        data={completedOrders}
        contract={(c) => c}
        sx={OrdersHistoryPageSx.listWrapper}
        sxList={OrdersHistoryPageSx.listContainer}
      />
      <ContractList
        header={
          <Box sx={OrdersHistoryPageSx.listHeader}>
            Voided Orders
            <InlineBadge value={voidedOrders.length} color="tagRed" sx={OrdersHistoryPageSx.headerBadge} />
          </Box>
        }
        emptyDefault={<EmptyOrderListItem message="No voided orders" />}
        Template={VoidedOrderListItem}
        data={voidedOrders}
        contract={(c) => c}
        sx={OrdersHistoryPageSx.listWrapper}
        sxList={OrdersHistoryPageSx.listContainer}
      />
    </Box>
  );
};

export default OrdersHistoryPage;
