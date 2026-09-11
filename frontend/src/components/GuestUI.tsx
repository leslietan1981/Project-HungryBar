import { useCallback, useRef, useState } from "react";
import { createSearchParams, Route, Routes, useLocation, useNavigate } from "react-router";

import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import SplashPage from "./ui-guest/SplashPage.tsx";
import GuestHomePage from "./ui-guest/GuestHomePage.tsx";
import GuestNav from "./ui-guest/GuestNav.tsx";
import { MobileFrameConfig, useMobileFrameContext } from "./MobileFrame.tsx";
import { NAV_ROUTES } from "../constants/navigationRoutes.ts";
import { animFadeAndSlideIn } from "../transitions/transitionStyles.ts";
import ProductDetails from "./ui-guest/ProductDetails.tsx";
import CartPage from "./ui-guest/CartPage.tsx";
import { guestNavData } from "../constants/guestNavData.tsx";
import { useGuestNavigation } from "../hooks/useGuestNavigation.ts";
import { useCart, type CartItemProps } from "../hooks/useCart.ts";
import type { ProductResponse } from "../types/api/product.types.ts";
import { useSession } from "../hooks/useSession.ts";
import { NavigateWithQuery } from "./common/NavigateWithQuery.tsx";
import ConfirmationDialog from "./common/ConfirmationDialog.tsx";
import { useConfirmation } from "../hooks/useConfirmation.ts";

const GuestUISx = {
  wrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
    bgcolor: "surface.main",
  },
  contentContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
} satisfies Record<string, SxProps<Theme>>;

const GuestUI = () => {
  const isMobile = useMobileFrameContext();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [navHeight, setNavHeight] = useState(0);
  const location = useLocation();
  const [details, setDetails] = useState<ProductResponse | CartItemProps | null>(null);
  const { navigateTo } = useGuestNavigation();
  const navObserverRef = useRef<ResizeObserver | null>(null);
  const { session, setCart } = useSession();
  const { cartItemCount } = useCart(session.cart, setCart);
  const { confirm } = useConfirmation();
  const navigate = useNavigate();

  const navActiveIdx = guestNavData.findIndex(({ value }) => value === location.pathname);
  const isKnownNavRoute = guestNavData.some(({ value }) => value === location.pathname);
  const navBadges: Record<string, number> = { [NAV_ROUTES.guest.full.cart]: cartItemCount };
  const usesDetails = [NAV_ROUTES.guest.full.home, NAV_ROUTES.guest.full.cart];

  const handleNavigation = async (value: string) => {
    if (value === NAV_ROUTES.index) {
      const confirmed = await confirm({
        message: "Do you want to start over?",
        confirmLabel: "Start Over",
        cancelLabel: "No",
      });

      if (confirmed) navigate({ pathname: value, search: `${createSearchParams({ tn: session.table })}` });
      return;
    }
    navigateTo(value);
  };

  const handleDetails = (details: any) => {
    (document.activeElement as HTMLElement)?.blur();
    setDetails(details);
  };

  const handleCloseProductDetails = () => {
    setDetails(null);
  };

  const navRefCallback = useCallback((node: HTMLDivElement | null) => {
    navObserverRef.current?.disconnect();
    if (!node) return;

    navObserverRef.current = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setNavHeight(Math.ceil(entry.contentRect.height));
    });
    navObserverRef.current.observe(node);
  }, []);

  return (
    <Box sx={GuestUISx.wrapper}>
      <Box ref={containerRef} sx={GuestUISx.contentContainer}>
        <Routes>
          <Route
            path={NAV_ROUTES.guest.index}
            element={<NavigateWithQuery to={NAV_ROUTES.guest.full.splash} replace />}
          />
          <Route path={NAV_ROUTES.guest.splash} element={<SplashPage />} />
          <Route
            path={NAV_ROUTES.guest.home}
            element={<GuestHomePage navHeight={navHeight} setDetails={handleDetails} />}
          />
          <Route path={NAV_ROUTES.guest.cart} element={<CartPage navHeight={navHeight} setDetails={handleDetails} />} />
        </Routes>
        {isKnownNavRoute && (
          <GuestNav
            ref={navRefCallback}
            navData={guestNavData}
            paperSx={[
              { pb: isMobile ? "env(safe-area-inset-bottom, 0px)" : MobileFrameConfig.bottom },
              animFadeAndSlideIn("up", 10, 600),
            ]}
            onNavigate={handleNavigation}
            activeIdx={navActiveIdx}
            badges={navBadges}
          />
        )}
        {usesDetails.includes(location.pathname) && (
          <ProductDetails
            open={details !== null}
            paddingBottom={isMobile ? "env(safe-area-inset-bottom, 0px)" : MobileFrameConfig.bottom}
            container={containerRef.current}
            onClose={handleCloseProductDetails}
            item={details}
            onAddComplete={handleCloseProductDetails}
          />
        )}
        <ConfirmationDialog container={containerRef.current} />
      </Box>
    </Box>
  );
};

export default GuestUI;
