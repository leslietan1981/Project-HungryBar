import { Box } from "@mui/material";

import ContractList from "../common/ContractList.tsx";
import NewOrderListItem from "./NewOrderListItem.tsx";

import type { SxProps, Theme } from "@mui/material/styles";
import InlineBadge from "../common/InlineBadge.tsx";
import { dev_useOrders } from "../../dev-helpers/dev_useOrders.ts";
import AcceptedOrderListItem from "./AcceptedOrderListItem.tsx";
import EmptyOrderListItem from "./EmptyOrderListItem.tsx";
import { animFadeAndSlideIn } from "../../transitions/transitionStyles.ts";

const ActiveOrdersPageSx = {
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

const ActiveOrdersPage = () => {
  const { getOrdersByOrderState } = dev_useOrders("orders");
  const newOrders = getOrdersByOrderState("new");
  const acceptedOrders = getOrdersByOrderState("accepted");

  return (
    <Box sx={[ActiveOrdersPageSx.wrapper, animFadeAndSlideIn("up", "2px", 400)]}>
      <ContractList
        header={
          <Box sx={ActiveOrdersPageSx.listHeader}>
            New Orders
            <InlineBadge value={newOrders.length} color="tagYellow" sx={ActiveOrdersPageSx.headerBadge} />
          </Box>
        }
        emptyDefault={<EmptyOrderListItem message="No new orders" />}
        Template={NewOrderListItem}
        data={newOrders}
        contract={(c) => c}
        sx={ActiveOrdersPageSx.listWrapper}
        sxList={ActiveOrdersPageSx.listContainer}
      />
      <ContractList
        header={
          <Box sx={ActiveOrdersPageSx.listHeader}>
            Accepted Orders
            <InlineBadge value={acceptedOrders.length} color="tagBlue" sx={ActiveOrdersPageSx.headerBadge} />
          </Box>
        }
        emptyDefault={<EmptyOrderListItem message="No accepted orders" />}
        Template={AcceptedOrderListItem}
        data={acceptedOrders}
        contract={(c) => c}
        sx={ActiveOrdersPageSx.listWrapper}
        sxList={ActiveOrdersPageSx.listContainer}
      />
    </Box>
  );
};

export default ActiveOrdersPage;
