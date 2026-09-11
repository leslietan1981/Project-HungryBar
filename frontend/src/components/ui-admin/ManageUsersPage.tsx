import { Box, Button, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import PillNavBar, { type PillNavItem } from "../common/PillNavBar.tsx";
import { AccountCircleOutlined, AddOutlined, AdminPanelSettingsOutlined, Groups2Outlined } from "@mui/icons-material";
import { NAV_ROUTES } from "../../constants/navigationRoutes.ts";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router";
import SearchField from "../common/SearchField.tsx";

const ManageUsersPageSx = {
  wrapper: {
    position: "relative",
    px: "1.6rem",
  },
  navContainer: {
    display: "flex",
    gap: "0.8rem",
  },
} satisfies Record<string, SxProps<Theme>>;

const navData: PillNavItem[] = [
  {
    value: NAV_ROUTES.admin.users.full.members,
    icon: <AccountCircleOutlined />,
    label: "Members",
  },
  {
    value: NAV_ROUTES.admin.users.full.staff,
    icon: <Groups2Outlined />,
    label: "Staff",
  },
  {
    value: NAV_ROUTES.admin.users.full.admins,
    icon: <AdminPanelSettingsOutlined />,
    label: "Admins",
  },
];

const ManageUsersPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box sx={ManageUsersPageSx.wrapper}>
      <Box sx={ManageUsersPageSx.navContainer}>
        <PillNavBar
          navData={navData}
          onNavigate={navigate}
          setSelected={(item) => location.pathname === item.value}
          sx={{ mr: "auto" }}
        />
        {
          <Button disableElevation variant="contained" color="secondary">
            <AddOutlined />
            <Typography>{"Add Admin"}</Typography>
          </Button>
        }
        <SearchField size="small" color="primary" />
      </Box>
      <Box>
        <Routes>
          <Route
            path={NAV_ROUTES.admin.users.index}
            element={<Navigate to={NAV_ROUTES.admin.users.full.members} replace />}
          />
          <Route path={NAV_ROUTES.admin.users.members} element={<ManageUsersPage />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default ManageUsersPage;
