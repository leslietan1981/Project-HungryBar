import { Box, List, type BoxProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import CartListItem from "./CartListItem.tsx";
import { useEffect, useRef, useState } from "react";
import CartListItemTotals from "./CartListItemTotals.tsx";
import type { CartItemProps, CartTotals } from "../../hooks/useCart.ts";

const CartListSx = {
  wrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    bgcolor: "surface.lighter",
  },
  list: {
    overflowY: "auto",
    overscrollBehaviorX: "none",
    scrollbarColor: (theme) => theme.palette.scrollbar.main,
    p: 0,
    pt: "1.6rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.6rem",
  },
  listItem: {
    px: "1.6rem",
  },
} satisfies Record<string, SxProps<Theme>>;

const DEFAULT_CART_TOTALS: CartTotals = { subtotal: 0, serviceCharge: 0, tax: 0, total: 0 };

interface CartListProps extends BoxProps {
  cart?: CartItemProps[];
  cartTotals?: CartTotals;
  paddingBottom?: string;
  onEdit?: (item: CartItemProps, e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const CartList = ({ sx, cart = [], cartTotals = DEFAULT_CART_TOTALS, paddingBottom, onEdit }: CartListProps) => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  const paddingBottomSx: SxProps<Theme> = paddingBottom ? { pb: paddingBottom } : {};

  const listPaddingTop = ((headerHeight) => {
    const sxList = CartListSx.list;
    const result = String("pt" in sxList ? sxList["pt"] : "p" in sxList ? sxList["p"] : 0);
    return `calc(${result}${result === "0" ? "px" : ""} + ${headerHeight}px)`;
  })(headerHeight);

  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const observer = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;

      entries.forEach((entry) => {
        if (entry.target === headerEl) {
          setHeaderHeight(Math.ceil(entry.contentRect.height));
        }
      });
    });

    observer.observe(headerEl);

    return () => observer.disconnect();
  }, []);

  return (
    <Box sx={[CartListSx.wrapper, ...(Array.isArray(sx) ? sx : [sx])]}>
      <List sx={[CartListSx.list, paddingBottomSx, { pt: listPaddingTop }]}>
        {cart.map((cartItem, idx) => {
          const isLast = idx === cart.length - 1;
          return (
            <CartListItem
              key={cartItem.id}
              sx={CartListSx.listItem}
              details={cartItem}
              onEdit={onEdit}
              isLast={isLast}
            />
          );
        })}
        <CartListItemTotals
          sx={CartListSx.listItem}
          subtotal={cartTotals.subtotal}
          serviceCharge={cartTotals.serviceCharge}
          tax={cartTotals.tax}
          total={cartTotals.total}
        />
      </List>
    </Box>
  );
};

export default CartList;
