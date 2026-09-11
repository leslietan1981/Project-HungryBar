import { useCallback, useRef, useState } from "react";

import { Box, Button, Chip } from "@mui/material";
import type { BoxProps } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";

import GuestPageWrapper from "./GuestPageWrapper.tsx";
import CartList from "./CartList.tsx";
import { toAmountString } from "../../utils/formatUtils.ts";
import { useCart, type CartItemProps } from "../../hooks/useCart.ts";
import CartEmptyBlurb from "./CartEmptyBlurb.tsx";
import { ShoppingCartOutlined } from "@mui/icons-material";
import PhCookingPot from "../custom-svgicons/PhCookingPot.tsx";
import TblReceiptTax from "../custom-svgicons/TblReceiptTax.tsx";
import GuestOrdersList from "./GuestOrdersList.tsx";
import { dev_useOrders } from "../../dev-helpers/dev_useOrders.ts";
import { svgLabelSx } from "../../sx/typographySx.ts";
import { useSession } from "../../hooks/useSession.ts";
import { useConfirmation } from "../../hooks/useConfirmation.ts";
import { animFadeAndSlideIn } from "../../transitions/transitionStyles.ts";

const CartPageSx = {
  tabContainer: {
    flexShrink: 0,
    display: "flex",
    gap: ".5rem",
    px: "1.6rem",
    mb: "1rem",
  },
  content: {
    flexGrow: 1,
    minHeight: 0,
  },
  actionContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    p: "0.5rem 1.6rem",
    bgcolor: (theme) => alpha(theme.palette.surface.lighter, 0.8),
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  },
  ctaContainer: {
    px: "1.6rem",
    py: ".75rem",
    alignItems: "center",
    gap: "1rem",
  },
} satisfies Record<string, SxProps<Theme>>;

interface CartPageProps extends BoxProps {
  navHeight?: number;
  setDetails?: React.Dispatch<React.SetStateAction<CartItemProps | null>>;
}

const CartPage = ({ sx, navHeight, setDetails }: CartPageProps) => {
  const { session, setCart } = useSession();
  const { cart, cartTotals, emptyCart } = useCart(session.cart, setCart, {
    serviceChargeRate: 0.1,
    taxRate: 0.09,
  });
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const observerRef = useRef<ResizeObserver | null>(null);
  const [isOrdersView, setIsOrdersView] = useState(false);
  const { addOrder } = dev_useOrders("orders");
  const { confirm } = useConfirmation();

  const paddingBottom = `calc(${navHeight}px + ${containerHeight}px + 1rem)`;
  const isCartEmpty = cart.length === 0;
  const greeting = isCartEmpty ? "Your cart is empty" : "Ready to send your order?";
  const sub = isCartEmpty ? "Let us make you something delicious." : "Our kitchen is ready and waiting.";

  const handleCartEdit = (item: CartItemProps, _e?: React.MouseEvent<HTMLButtonElement>) => {
    setDetails?.(item);
  };

  const handlePlaceOrder = async () => {
    const confirmed = await confirm({
      message: "Place your order?",
      confirmLabel: "Yes",
      cancelLabel: "No",
    });

    if (!confirmed) return;

    addOrder(session.cart, session.table);
    emptyCart();
    setIsOrdersView(true);
  };

  const containerRefCallback = useCallback((node: HTMLDivElement | null) => {
    observerRef.current?.disconnect();
    if (!node) return;

    observerRef.current = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setContainerHeight(Math.ceil(entry.contentRect.height));
    });
    observerRef.current.observe(node);
  }, []);

  return (
    <GuestPageWrapper sx={sx} greeting={greeting} sub={sub}>
      <Box sx={CartPageSx.tabContainer}>
        <Chip
          color={!isOrdersView ? "primary" : "secondary"}
          icon={<ShoppingCartOutlined />}
          label="Cart"
          sx={svgLabelSx}
          clickable
          onClick={() => setIsOrdersView(false)}
        />
        <Chip
          color={isOrdersView ? "primary" : "secondary"}
          icon={<PhCookingPot />}
          label="Orders"
          sx={svgLabelSx}
          clickable
          onClick={() => setIsOrdersView(true)}
        />
        <Chip color="secondaryAlt" icon={<TblReceiptTax />} label="Bill" sx={[svgLabelSx, { ml: "auto" }]} clickable />
      </Box>
      {!isOrdersView &&
        (!isCartEmpty ? (
          [
            <CartList
              key="cart-list"
              sx={[CartPageSx.content, animFadeAndSlideIn("up", "2px", 400)]}
              paddingBottom={paddingBottom}
              cart={cart}
              cartTotals={cartTotals}
              onEdit={handleCartEdit}
            />,
            <Box
              key="cart-action"
              ref={containerRefCallback}
              sx={[CartPageSx.actionContainer, { bottom: `${navHeight}px` }, animFadeAndSlideIn("up", "2px", 400)]}
            >
              <Button variant="contained" sx={CartPageSx.ctaContainer} onClick={handlePlaceOrder}>
                {`Place Order - ${toAmountString(cartTotals.total)}`}
              </Button>
            </Box>,
          ]
        ) : (
          <CartEmptyBlurb paddingBottom={`${navHeight}px`} sx={animFadeAndSlideIn("up", "2px", 400)} />
        ))}
      {isOrdersView && (
        <GuestOrdersList
          sx={[CartPageSx.content, animFadeAndSlideIn("up", "2px", 400)]}
          paddingBottom={paddingBottom}
        />
      )}
    </GuestPageWrapper>
  );
};

export default CartPage;
