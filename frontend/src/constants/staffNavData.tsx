import { HistoryRounded, StarBorderRounded } from "@mui/icons-material";
import { NAV_ROUTES } from "./navigationRoutes.ts";
import type { PillNavItem } from "../components/common/PillNavBar.tsx";

export const staffNavData: PillNavItem[] = [
  {
    value: NAV_ROUTES.staff.full.orders_active,
    icon: <StarBorderRounded />,
    label: "Active Orders",
  },
  {
    value: NAV_ROUTES.staff.full.orders_history,
    icon: <HistoryRounded />,
    label: "Order History",
  },
];
