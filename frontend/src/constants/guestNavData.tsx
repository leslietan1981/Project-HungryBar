import {
  AccountCircleOutlined,
  RestartAltRounded,
  RestaurantRounded,
  SavingsOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";

import type { GuestNavItem } from "../components/ui-guest/GuestNav.tsx";
import { NAV_ROUTES } from "./navigationRoutes.ts";

export const guestNavData: GuestNavItem[] = [
  {
    value: NAV_ROUTES.guest.full.home,
    icon: <RestaurantRounded />,
    label: "Menu",
  },
  // {
  //   value: "",
  //   icon: <SavingsOutlined />,
  //   label: "Rewards",
  // },
  {
    value: NAV_ROUTES.guest.full.cart,
    icon: <ShoppingCartOutlined />,
    label: "Cart",
  },
  // {
  //   value: "",
  //   icon: <AccountCircleOutlined />,
  //   label: "Member",
  // },
  {
    value: NAV_ROUTES.index,
    icon: <RestartAltRounded />,
    label: "Start Over",
  },
];
