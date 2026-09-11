import { ManageAccountsRounded, RestaurantRounded } from "@mui/icons-material";
import { NAV_ROUTES } from "./navigationRoutes.ts";
import type { PillNavItem } from "../components/common/PillNavBar.tsx";

export const adminNavData: PillNavItem[] = [
  {
    value: NAV_ROUTES.admin.full.products,
    icon: <RestaurantRounded />,
    label: "Manage Products",
  },
  {
    value: NAV_ROUTES.admin.full.users,
    icon: <ManageAccountsRounded />,
    label: "Manage Users",
  },
];
