import { Avatar, Box, Typography } from "@mui/material";
import type { BoxProps } from "@mui/material";

import { useLocation, useNavigate } from "react-router";
import { brandAvatarSx } from "../../sx/avatarSx.ts";
import TabletNavUserMenu from "../common/TabletNavUserMenu.tsx";
import { TabletNavSx } from "../../sx/TabletNavSxs.ts";
import PillNavBar, { type PillNavItem } from "../common/PillNavBar.tsx";

interface AdminNavProps extends BoxProps {
  navData: PillNavItem[];
}

const AdminNav = ({ sx, navData }: AdminNavProps) => {
  const location = useLocation();
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
            onNavigate={handleNavigation}
            setSelected={(item) => location.pathname.includes(item.value)}
          />
        </Box>
        <Box sx={TabletNavSx.column}>
          <Typography sx={TabletNavSx.motivation}>Let's do our best with a smile!</Typography>
          <Box sx={TabletNavSx.columnDivider} />
          <TabletNavUserMenu />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminNav;
