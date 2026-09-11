import { useState } from "react";

import { Box, ButtonBase, Checkbox, FormControl, FormControlLabel, FormGroup, Typography } from "@mui/material";
import type { BoxProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import { toAmountString } from "../../utils/formatUtils.ts";
import type { ProductOptionResponse } from "../../types/api/product.types.ts";
import { body1CAltSx, subtitle1CSx } from "../../sx/typographySx.ts";

const ProductOptionsSx = {
  legend: {
    color: "textColor.title",
  },
  groupContainer: { mt: "0.6rem", display: "flex", flexDirection: "column", gap: "0.6rem" },
  optionWrapper: {
    width: "100%",
    borderRadius: "8px",
  },
  optionContainer: {
    width: "100%",
    border: "1px solid",
    borderColor: "secondary.main",
    borderRadius: "8px",
    bgcolor: "surface.light",
    ml: 0,
    mr: 0,
    pr: "1rem",
    "& .MuiFormControlLabel-label": {
      display: "flex",
      flex: 1,
    },
  },
  checkbox: {
    pointerEvents: "none",
  },
  labelContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
} satisfies Record<string, SxProps<Theme>>;

interface ProductOptionsProps extends BoxProps {
  options: ProductOptionResponse[];
  checked?: Record<string, boolean>;
  setChecked?: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  disabled?: boolean;
}

const ProductOptions = ({
  sx,
  options,
  checked: ctrlChecked,
  setChecked: setCtrlChecked,
  disabled = false,
}: ProductOptionsProps) => {
  const [localChecked, setLocalChecked] = useState<Record<string, boolean>>({});

  const isControlled = ctrlChecked !== undefined && setCtrlChecked !== undefined;
  const checked = isControlled ? ctrlChecked : localChecked;
  const setChecked = isControlled ? setCtrlChecked : setLocalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked({
      ...checked,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <Box sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      <FormControl component="fieldset">
        <Typography component="legend" sx={subtitle1CSx}>
          Options
        </Typography>
        <FormGroup sx={ProductOptionsSx.groupContainer}>
          {options.map(({ option_id, description, price }: ProductOptionResponse) => (
            <ButtonBase
              disabled={disabled}
              key={option_id}
              component="div"
              color="secondary"
              sx={ProductOptionsSx.optionWrapper}
            >
              <FormControlLabel
                sx={ProductOptionsSx.optionContainer}
                label={
                  <Box sx={ProductOptionsSx.labelContainer}>
                    <Typography sx={body1CAltSx}>{description}</Typography>
                    <Typography sx={body1CAltSx}>+{toAmountString(price, { prefix: "" })}</Typography>
                  </Box>
                }
                control={
                  <Checkbox
                    disableRipple
                    checked={checked[option_id] === true}
                    name={String(option_id)}
                    onChange={handleChange}
                  />
                }
              />
            </ButtonBase>
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default ProductOptions;
