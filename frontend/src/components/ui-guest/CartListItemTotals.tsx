import { Box, Card, Grid, ListItem, Typography } from "@mui/material";
import type { ListItemProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import { toAmountString } from "../../utils/formatUtils.ts";
import { body2Sx, subtitle1Sx } from "../../sx/typographySx.ts";

const CartListItemTotalsSx = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    py: 0,
  },
  base: {
    bgcolor: "transparent",
    borderRadius: 0,
  },
  layout: {
    justifyContent: "space-between",
    textAlign: "left",
  },
  bottomDivider: {
    width: "100%",
    height: "1px",
    bgcolor: "border.main",
  },
} satisfies Record<string, SxProps<Theme>>;

interface CartListItemTotalsProps extends ListItemProps {
  subtotal?: number;
  serviceCharge?: number;
  tax?: number;
  total?: number;
}

const CartListItemTotals = ({ sx, subtotal = 0, serviceCharge = 0, tax = 0, total = 0 }: CartListItemTotalsProps) => {
  const totalsArr = [
    {
      sx: body2Sx,
      label: "Subtotal",
      value: toAmountString(subtotal),
    },
    {
      sx: body2Sx,
      label: "Service Charge",
      value: toAmountString(serviceCharge),
    },
    {
      sx: body2Sx,
      label: "GST 9%",
      value: toAmountString(tax),
    },
    {
      sx: subtitle1Sx,
      label: "Total",
      value: toAmountString(total),
    },
  ];
  return (
    <ListItem sx={[CartListItemTotalsSx.wrapper, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Box sx={CartListItemTotalsSx.bottomDivider} />
      <Card elevation={0} sx={CartListItemTotalsSx.base}>
        <Grid container columnSpacing={1} sx={CartListItemTotalsSx.layout}>
          {totalsArr.map(({ sx, label, value }, idx) => [
            <Grid key={`label-${idx}`} size={9}>
              <Typography sx={sx}>{label}</Typography>
            </Grid>,
            <Grid key={`value-${idx}`} size={3}>
              <Typography sx={sx} align="right">
                {value}
              </Typography>
            </Grid>,
          ])}
        </Grid>
      </Card>
    </ListItem>
  );
};

export default CartListItemTotals;
