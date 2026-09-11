import { Box, Card, CardActionArea, CardMedia, ListItem, Typography } from "@mui/material";
import type { ListItemProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import { toAmountString } from "../../utils/formatUtils.ts";

import MenuPlaceholderImg from "../../assets/d4125a82862de17d9fa79e7f78a938fb.jpg";
import type { ProductResponse } from "../../types/api/product.types.ts";
import { body2CSx, subtitle1CSx, subtitle2CSx } from "../../sx/typographySx.ts";

const ProductListItemSx = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "1.6rem",
    pt: "1.6rem",
    pb: 0,
  },
  base: {
    bgcolor: "transparent",
    borderRadius: 0,
  },
  actionArea: {
    display: "flex",
    alignItems: "stretch",
  },
  mediaWrapper: {
    flex: "0 0 30%",
  },
  media: {
    borderRadius: "8px",
    overflow: "hidden",
  },
  contentWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  contentLayout: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    pl: "1rem",
  },
  title: {
    ...subtitle1CSx,
    lineHeight: 1.2,
  },
  body: {
    ...body2CSx,
    flex: 1,
    lineHeight: 1.4,
  },
  bottomDivider: {
    width: "100%",
    height: "1px",
    bgcolor: "border.main",
  },
  lastMarginBottom: {
    mb: "3.2rem",
  },
} satisfies Record<string, SxProps<Theme>>;

interface ProductListItemProps extends Omit<ListItemProps, "onClick"> {
  details: ProductResponse;
  isLast?: boolean;
  onClick?: (details: ProductResponse, e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const ProductListItem = ({ sx, details, isLast = false, onClick }: ProductListItemProps) => {
  const { name, description, image_url, price } = details;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick !== undefined) {
      onClick(details, e);
    }
  };

  return (
    <ListItem
      sx={[ProductListItemSx.wrapper, ...(Array.isArray(sx) ? sx : [sx]), isLast && ProductListItemSx.lastMarginBottom]}
    >
      <Card elevation={0} sx={ProductListItemSx.base}>
        <CardActionArea sx={ProductListItemSx.actionArea} onClick={handleClick}>
          <Box sx={ProductListItemSx.mediaWrapper}>
            <CardMedia
              component="img"
              image={image_url ? image_url : MenuPlaceholderImg}
              alt="Photo of food"
              sx={ProductListItemSx.media}
            />
          </Box>
          <Box sx={ProductListItemSx.contentWrapper}>
            <Box sx={ProductListItemSx.contentLayout}>
              <Typography component="div" sx={ProductListItemSx.title}>
                {name}
              </Typography>
              <Typography component="div" sx={ProductListItemSx.body}>
                {description}
              </Typography>
              <Typography component="div" sx={subtitle2CSx}>
                {toAmountString(price)}
              </Typography>
            </Box>
          </Box>
        </CardActionArea>
      </Card>
      {!isLast && <Box sx={ProductListItemSx.bottomDivider} />}
    </ListItem>
  );
};

export default ProductListItem;
