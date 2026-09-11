import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import StaffNav from "./ui-staff/StaffNav.tsx";
import ActiveOrdersPage from "./ui-staff/ActiveOrdersPage.tsx";
import { Navigate, Route, Routes } from "react-router";
import { NAV_ROUTES } from "../constants/navigationRoutes.ts";
import OrdersHistoryPage from "./ui-staff/OrdersHistoryPage.tsx";
import { dev_useOrders } from "../dev-helpers/dev_useOrders.ts";
import { staffNavData } from "../constants/staffNavData.tsx";

const StaffUISx = {
  wrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
    bgcolor: "surface.main",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1.6rem",
    height: "100%",
  },
} satisfies Record<string, SxProps<Theme>>;

const StaffUI = () => {
  const { getOrdersCountByOrderState } = dev_useOrders("orders");
  const activeOrdersCount = getOrdersCountByOrderState("new") + getOrdersCountByOrderState("accepted");
  const navBadges: Record<string, number> = { [NAV_ROUTES.staff.full.orders_active]: activeOrdersCount };

  return (
    <Box sx={StaffUISx.wrapper}>
      <Box sx={StaffUISx.contentContainer}>
        <StaffNav navData={staffNavData} badges={navBadges} />
        <Routes>
          <Route
            path={NAV_ROUTES.staff.index}
            element={<Navigate to={NAV_ROUTES.staff.full.orders_history} replace />}
          />
          <Route path={NAV_ROUTES.staff.orders_active} element={<ActiveOrdersPage />} />
          <Route path={NAV_ROUTES.staff.orders_history} element={<OrdersHistoryPage />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default StaffUI;
