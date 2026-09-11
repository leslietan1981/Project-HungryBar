import type { TextFieldProps } from "@mui/material";
import { alpha } from "@mui/material/styles";

export const TextFieldSlotProps = {
  primaryAlt: {
    inputLabel: {
      sx: {
        color: (theme) => alpha(theme.palette.primaryAlt.dark, 0.8),
        "&.Mui-focused": {
          color: "primaryAlt.main",
        },
      },
    },
    input: {
      sx: {
        color: "primaryAlt.dark",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "border.dark",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "primaryAlt.main",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "primaryAlt.main",
        },
      },
    },
    formHelperText: {
      sx: {
        color: "error.light",
      },
    },
  },
} satisfies Record<string, TextFieldProps["slotProps"]>;
