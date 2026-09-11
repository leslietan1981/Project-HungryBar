import { Navigate, Route, Routes } from "react-router";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import { NAV_ROUTES } from "../constants/navigationRoutes.ts";
import AdminNav from "./ui-admin/AdminNav.tsx";
import { adminNavData } from "../constants/adminNavData.tsx";
import ManageUsersPage from "./ui-admin/ManageUsersPage.tsx";

const AdminUISx = {
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

const AdminUI = () => {
  return (
    <Box sx={AdminUISx.wrapper}>
      <Box sx={AdminUISx.contentContainer}>
        <AdminNav navData={adminNavData} />
        <Routes>
          <Route path={NAV_ROUTES.admin.index} element={<Navigate to={NAV_ROUTES.admin.full.products} replace />} />
          <Route path={NAV_ROUTES.admin.products} element={<></>} />
          <Route path={NAV_ROUTES.admin.users.parent} element={<ManageUsersPage />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AdminUI;
