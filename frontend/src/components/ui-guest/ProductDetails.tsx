import { useEffect, useRef, useState } from "react";

import { Box, Button, Chip, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import type { DialogProps } from "@mui/material";
import { WarningAmberRounded } from "@mui/icons-material";
import type { SxProps, Theme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

import StyledImg from "../common/StyledImg.tsx";
import SpinButton from "../common/SpinButton.tsx";
import ProductOptions from "./ProductOptions.tsx";

import { toAmountString } from "../../utils/formatUtils.ts";
import { animFadeAndSlideIn } from "../../transitions/transitionStyles.ts";
import { useCart, type CartItemProps } from "../../hooks/useCart.ts";
import { calcSubtotal } from "../../utils/calcUtils.ts";
import { getCheckedOptions } from "../../utils/dataUtils.ts";
import type { ProductOptionResponse, ProductResponse } from "../../types/api/product.types.ts";

import PlaceholderImg from "../../assets/d4125a82862de17d9fa79e7f78a938fb.jpg";
import { body1CSx, labelSx, title1CSx, warningCaptionSx } from "../../sx/typographySx.ts";
import { useSession } from "../../hooks/useSession.ts";

const dialogSlotProps: DialogProps["slotProps"] = {
  root: { sx: { position: "absolute" } },
  backdrop: { sx: { position: "absolute" } },
  container: { sx: { alignItems: "flex-end" } },
  paper: {
    sx: {
      margin: 0,
      width: "100%",
      height: "calc(100% - 1.6rem)",
      alignItems: "center",
      overflow: "hidden",
      willChange: "opacity",
      ...animFadeAndSlideIn("up", 20, 500),
    },
  },
};

const ProductDetailsSx = {
  dragWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    pt: "0.6rem",
    pb: "1.6rem",
    display: "flex",
    justifyContent: "center",
    background: (theme) =>
      `linear-gradient(to bottom, ${theme.palette.surface.main} 60%, ${alpha(theme.palette.surface.main, 0.8)})`,
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    zIndex: 10,
  },
  dragIndicator: {
    borderRadius: "99px",
    width: "50px",
    height: "4px",
    bgcolor: "secondary.main",
  },
  contentWrapper: {
    top: 0,
    pt: "3rem",
    px: "1.6rem",
    scrollbarColor: (theme) => theme.palette.scrollbar.main,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  heroImage: { borderRadius: "8px", aspectRatio: "4 / 3" },
  tagsContainer: {
    display: "flex",
    gap: "0.5rem",
  },
  mainInfoContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  noteContainer: {
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
    border: "1px solid",
    borderColor: (theme) => alpha(theme.palette.warning.light, 0.5),
    borderRadius: "8px",
    bgcolor: (theme) => alpha(theme.palette.warning.light, 0.08),
    p: "0.5rem 0.8rem",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  actionsWrapper: { position: "absolute", bottom: 0, width: "100%", p: 0 },
  actionsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "1.6rem",
    width: "100%",
    borderRadius: 0,
    border: "1px solid",
    borderColor: "border.main",
    background: (theme) =>
      `linear-gradient(to top, ${theme.palette.surface.main} 60%, ${alpha(theme.palette.surface.main, 0.8)})`,
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    zIndex: 10,
  },
  ctaContainer: {
    my: "0.5rem",
    py: ".75rem",
    alignItems: "center",
    gap: "1rem",
    minWidth: "58%",
  },
} satisfies Record<string, SxProps<Theme>>;

interface ProductDetailsProps extends DialogProps {
  item: ProductResponse | CartItemProps | null;
  paddingBottom?: string | number;
  onAddComplete?: () => void;
}

const emptyDetails: ProductResponse = { id: 0, name: "-", category: "-", description: "-", note: "-", price: 0 };

const ProductDetails = ({ open, container, onClose, item, paddingBottom: pb, onAddComplete }: ProductDetailsProps) => {
  const isCartItem = item && "product" in item;
  const resolvedDetails = isCartItem ? item?.product : (item ?? emptyDetails);
  const hasDetails = item != null;
  const { image_url, category, name, description, note, options: optionList } = resolvedDetails;

  const [quantity, setQuantity] = useState(1);
  const actionsRef = useRef<HTMLDivElement>(null);
  const [actionsHeight, setActionsHeight] = useState(0);
  const [options, setOptions] = useState<Record<string, boolean>>({});
  const { session, setCart } = useSession();
  const { addToCart, updateCartItem } = useCart(session.cart, setCart);
  const [isAdding, setIsAdding] = useState(false);

  const subtotal: number = hasDetails
    ? (() => {
        const checkedOptions: ProductOptionResponse[] = resolvedDetails.options
          ? getCheckedOptions(resolvedDetails.options, options)
          : [];
        return calcSubtotal(resolvedDetails.price, checkedOptions, quantity);
      })()
    : 0;

  const handlePrimaryAction = () => {
    setIsAdding(true);
    if (isCartItem) {
      updateCartItem({ id: item.id, quantity, options });
    } else if (item !== null) {
      addToCart({ product: item, options, quantity });
    }

    if (onAddComplete !== undefined) {
      onAddComplete();
      return;
    }
    setIsAdding(false);
  };

  useEffect(() => {
    if (open) {
      setQuantity(isCartItem ? item?.quantity : 1);
      setOptions(isCartItem ? item?.options : {});
      setIsAdding(false);
    }

    const actionsEl = actionsRef.current;
    if (!actionsEl) return;

    const observer = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;

      entries.forEach((entry) => {
        if (entry.target === actionsEl) {
          setActionsHeight(Math.ceil(entry.contentRect.height));
        }
      });
    });

    observer.observe(actionsEl);

    return () => observer.disconnect();
  }, [open]);

  return (
    <Dialog container={container} disablePortal open={open} slotProps={dialogSlotProps} onClose={onClose}>
      <DialogContent sx={[ProductDetailsSx.contentWrapper, { pb: `calc(${actionsHeight}px + 1rem)` }]}>
        <Box sx={ProductDetailsSx.dragWrapper}>
          <Box sx={ProductDetailsSx.dragIndicator} />
        </Box>
        <StyledImg src={image_url ?? PlaceholderImg} sx={ProductDetailsSx.heroImage} />
        <Box sx={ProductDetailsSx.tagsContainer}>
          <Chip label={category} variant="filled" color="label" size="small" sx={labelSx} />
        </Box>
        <Box sx={ProductDetailsSx.mainInfoContainer}>
          <Typography sx={title1CSx}>{name}</Typography>
          <Typography sx={body1CSx}>{description}</Typography>
        </Box>
        <Box sx={ProductDetailsSx.noteContainer}>
          <WarningAmberRounded color="warning" fontSize="small" />
          <Typography sx={warningCaptionSx}>{`Contains: ${note}`}</Typography>
        </Box>
        {optionList && (
          <ProductOptions
            disabled={isAdding}
            options={optionList}
            checked={options}
            setChecked={setOptions}
            sx={ProductDetailsSx.optionsContainer}
          />
        )}
      </DialogContent>
      <DialogActions ref={actionsRef} sx={ProductDetailsSx.actionsWrapper}>
        <Box sx={[ProductDetailsSx.actionsContainer, { ...(pb && { pb }) }]}>
          <SpinButton disabled={isAdding} min={1} max={10} value={quantity} setValue={setQuantity} />
          <Button
            disabled={isAdding}
            variant="contained"
            color="primary"
            sx={ProductDetailsSx.ctaContainer}
            onClick={handlePrimaryAction}
          >
            {`${isCartItem ? "Update Cart" : "Add to Cart"} - ${toAmountString(subtotal)}`}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetails;
