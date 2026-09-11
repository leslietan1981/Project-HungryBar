import { useEffect, useRef, useState } from "react";
import type { SetStateAction } from "react";

import { Box, Button, Card, CardMedia, List, ListItem, Typography } from "@mui/material";
import type { ListItemProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { DeleteForeverRounded, EditOutlined } from "@mui/icons-material";

import MenuPlaceholderImg from "../../assets/d4125a82862de17d9fa79e7f78a938fb.jpg";
import { toAmountString } from "../../utils/formatUtils.ts";
import SpinButton from "../common/SpinButton.tsx";
import { useCart, type CartItemProps } from "../../hooks/useCart.ts";
import { calcSubtotal } from "../../utils/calcUtils.ts";
import { animFadeAndSlideIn } from "../../transitions/transitionStyles.ts";
import { getCheckedOptions } from "../../utils/dataUtils.ts";
import type { ProductOptionResponse } from "../../types/api/product.types.ts";
import { body1Sx, body2CSx, subtitle1CSx, subtitle2CSx } from "../../sx/typographySx.ts";
import { useSession } from "../../hooks/useSession.ts";

const CartListItemSx = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "1.6rem",
    py: 0,
  },
  base: {
    bgcolor: "transparent",
    borderRadius: 0,
  },
  layout: {
    display: "flex",
    gap: "1rem",
    alignItems: "stretch",
  },
  mediaWrapper: {
    flex: "0 0 30%",
  },
  media: {
    borderRadius: "8px",
    overflow: "hidden",
  },
  contentContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  contentRow: {
    display: "flex",
    flex: "1 1 auto",
    alignItems: "flex-start",
  },
  infoContainer: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  body: {
    ...body2CSx,
    flex: 1,
    lineHeight: 1.4,
  },
  priceContainer: {
    flex: "0 0 auto",
  },
  actionsWrapper: {
    display: "flex",
  },
  actionsContainer: {
    flex: 1,
    display: "flex",
    gap: "1rem",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconButton: {
    p: "0.5rem",
    aspectRatio: "1 / 1",
    minWidth: 0,
    borderRadius: "99px",
  },
  confirmButton: {
    p: "0.25rem 1rem",
    minWidth: "0",
    ...body1Sx,
  },
  bottomDivider: {
    width: "100%",
    height: "1px",
    bgcolor: "border.main",
  },
} satisfies Record<string, SxProps<Theme>>;

interface CartListItemProps extends ListItemProps {
  details: CartItemProps;
  isLast?: boolean;
  onEdit?: (item: CartItemProps, e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const CartListItem = ({ sx, details, isLast = false, onEdit }: CartListItemProps) => {
  const { product, options } = details;
  const checkedOptions: ProductOptionResponse[] = product.options ? getCheckedOptions(product.options, options) : [];
  const subtotal: number = calcSubtotal(product.price, checkedOptions, details.quantity);
  const { session, setCart } = useSession();
  const { updateCartItem } = useCart(session.cart, setCart);

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const actionsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isConfirmingDelete) return;

    const handleOutsideInteraction = (e: MouseEvent) => {
      if (actionsRef.current && !actionsRef.current.contains(e.target as Node)) {
        setIsConfirmingDelete(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideInteraction);
    return () => document.removeEventListener("mousedown", handleOutsideInteraction);
  }, [isConfirmingDelete]);

  const handleUpdate: React.Dispatch<SetStateAction<number>> = (action) => {
    const nextQuantity = typeof action === "function" ? (action as (prev: number) => number)(details.quantity) : action;

    if (nextQuantity <= 0) {
      setIsConfirmingDelete(true);
      return;
    }

    updateCartItem({ id: details.id, quantity: nextQuantity });
  };

  const handleConfirmDelete = () => {
    updateCartItem({ id: details.id, quantity: 0 });
  };

  const handleCancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onEdit !== undefined) {
      onEdit(details, e);
    }
  };

  return (
    <ListItem sx={[CartListItemSx.wrapper, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Card elevation={0} sx={CartListItemSx.base}>
        <Box sx={CartListItemSx.layout}>
          <Box sx={CartListItemSx.mediaWrapper}>
            <CardMedia component="img" image={MenuPlaceholderImg} alt="Photo of food" sx={CartListItemSx.media} />
          </Box>
          <Box sx={CartListItemSx.contentContainer}>
            <Box sx={CartListItemSx.contentRow}>
              <Box sx={CartListItemSx.infoContainer}>
                <Typography sx={subtitle1CSx}>{product.name}</Typography>
                <List disablePadding>
                  {Object.entries(options).map(
                    ([key, value]) =>
                      value === true && (
                        <ListItem key={key} disablePadding disableGutters sx={CartListItemSx.body}>
                          {product.options?.find(({ option_id }) => String(option_id) === key)?.description}
                        </ListItem>
                      ),
                  )}
                </List>
              </Box>
              <Box sx={CartListItemSx.priceContainer}>
                <Typography sx={subtitle2CSx}>{toAmountString(subtotal)}</Typography>
              </Box>
            </Box>
            <Box sx={CartListItemSx.actionsWrapper}>
              {!isConfirmingDelete && (
                <Box sx={[CartListItemSx.actionsContainer, animFadeAndSlideIn("left", 1, 400)]}>
                  <Button
                    disableElevation
                    color="secondary"
                    variant="contained"
                    sx={[CartListItemSx.iconButton, { mr: "auto" }]}
                    onClick={handleEdit}
                  >
                    <EditOutlined fontSize="small" />
                  </Button>
                  <Button
                    disableElevation
                    color="secondary"
                    variant="contained"
                    sx={CartListItemSx.iconButton}
                    onClick={() => setIsConfirmingDelete(true)}
                  >
                    <DeleteForeverRounded fontSize="small" />
                  </Button>
                  <SpinButton value={details.quantity} setValue={handleUpdate} min={0} max={10} />
                </Box>
              )}
              {isConfirmingDelete && (
                <Box ref={actionsRef} sx={[CartListItemSx.actionsContainer, animFadeAndSlideIn("right", 1, 400)]}>
                  <Button
                    disableElevation
                    color="primary"
                    variant="contained"
                    sx={CartListItemSx.confirmButton}
                    onClick={handleConfirmDelete}
                  >
                    Remove
                  </Button>
                  <Button
                    disableElevation
                    color="secondary"
                    variant="contained"
                    sx={CartListItemSx.confirmButton}
                    onClick={handleCancelDelete}
                  >
                    No
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Card>
      {!isLast && <Box sx={CartListItemSx.bottomDivider} />}
    </ListItem>
  );
};

export default CartListItem;
