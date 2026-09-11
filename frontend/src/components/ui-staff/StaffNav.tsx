import { Avatar, Box, Typography } from "@mui/material";
import type { BoxProps } from "@mui/material";

import { dev_useOrders } from "../../dev-helpers/dev_useOrders.ts";
import { useNavigate } from "react-router";
import { brandAvatarSx } from "../../sx/avatarSx.ts";
import TabletNavUserMenu from "../common/TabletNavUserMenu.tsx";
import { TabletNavSx } from "../../sx/TabletNavSxs.ts";
import PillNavBar, { type PillNavItem } from "../common/PillNavBar.tsx";

interface StaffNavProps extends BoxProps {
  navData: PillNavItem[];
  badges?: Record<string, number>;
}

const StaffNav = ({ sx, navData, badges }: StaffNavProps) => {
  const { emptyOrders } = dev_useOrders("orders");
  const navigate = useNavigate();

  const handleNavigation = (value: string) => {
    navigate(value);
  };

  return (
    <Box sx={[TabletNavSx.wrapper, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Box sx={TabletNavSx.layout}>
        <Box sx={TabletNavSx.column}>
          <Avatar sx={brandAvatarSx}>餓</Avatar>
          <Box sx={TabletNavSx.columnDivider} />
          <PillNavBar
            navData={navData}
            badges={badges}
            onNavigate={handleNavigation}
            setSelected={(item) => location.pathname === item.value}
          />
        </Box>
        <Box sx={TabletNavSx.column}>
          <Typography sx={TabletNavSx.motivation}>Let's do our best with a smile!</Typography>
          <Box sx={TabletNavSx.columnDivider} />
          <TabletNavUserMenu onLogout={() => emptyOrders()} />
        </Box>
      </Box>
    </Box>
  );
};

export default StaffNav;
