import { Route, Routes } from "react-router";

import GuestUI from "./components/GuestUI.tsx";
import StaffUI from "./components/StaffUI.tsx";
import MobileFrame from "./components/MobileFrame.tsx";
import TabletFrame from "./components/TabletFrame.tsx";
import { NAV_ROUTES } from "./constants/navigationRoutes.ts";
import { NavigateWithQuery } from "./components/common/NavigateWithQuery.tsx";
import { ConfirmationProvider } from "./context/ConfirmationContext.tsx";
import AdminUI from "./components/AdminUI.tsx";

function App() {
  return (
    <ConfirmationProvider>
      <Routes>
        <Route path={NAV_ROUTES.index} element={<NavigateWithQuery to={NAV_ROUTES.guest.full.index} replace />} />
        <Route
          path={NAV_ROUTES.guest.parent}
          element={
            <MobileFrame>
              <GuestUI />
            </MobileFrame>
          }
        />
        <Route
          path={NAV_ROUTES.staff.parent}
          element={
            // <ProtectedRoute>
            <TabletFrame>
              <StaffUI />
            </TabletFrame>
            // </ProtectedRoute>
          }
        />
        <Route
          path={NAV_ROUTES.admin.parent}
          element={
            <TabletFrame>
              <AdminUI />
            </TabletFrame>
          }
        />
      </Routes>
    </ConfirmationProvider>
  );
}

export default App;
