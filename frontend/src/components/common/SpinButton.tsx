import { AddRounded, RemoveRounded } from "@mui/icons-material";
import { Box, Button, Typography, type BoxProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { useState } from "react";
import { subtitle2CSx } from "../../sx/typographySx.ts";

const SpinButtonSx = {
  wrapper: {
    display: "flex",
    alignItems: "center",
  },
  container: {
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    borderRadius: "999px",
    border: "1px solid",
    borderColor: "secondary.main",
    p: "0.1rem",
  },
  buttonContainer: {
    p: "0.25rem",
    aspectRatio: "1 / 1",
    minWidth: 0,
    borderRadius: "99px",
  },
  valueContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    px: "0.5rem",
    width: "3ch",
  },
  valueText: {
    color: "textColor.subtitle",
    fontWeight: "700",
  },
} satisfies Record<string, SxProps<Theme>>;

interface SpinButtonProps extends BoxProps {
  min?: number;
  max?: number;
  value?: number;
  setValue?: React.Dispatch<React.SetStateAction<number>>;
  disabled?: boolean;
}

const SpinButton = ({
  min = 0,
  max = 99,
  value: ctrlValue,
  setValue: setCtrlValue,
  disabled = false,
}: SpinButtonProps) => {
  const [localValue, setLocalValue] = useState<number>(0);

  const isControlled = ctrlValue !== undefined && setCtrlValue !== undefined;
  const value = isControlled ? ctrlValue : localValue;
  const setValue = isControlled ? setCtrlValue : setLocalValue;

  const handleClick = (isIncrement: boolean) => {
    setValue((prev) => prev + (isIncrement ? 1 : -1));
  };

  return (
    <Box sx={SpinButtonSx.wrapper}>
      <Box sx={SpinButtonSx.container}>
        <Button
          disableElevation
          disabled={disabled || !(value > min)}
          color="secondary"
          variant="contained"
          sx={SpinButtonSx.buttonContainer}
          onClick={() => handleClick(false)}
        >
          <RemoveRounded />
        </Button>
        <Box sx={[SpinButtonSx.valueContainer, { width: `${max.toString().length + 1}ch` }]}>
          <Typography sx={subtitle2CSx}>{value}</Typography>
        </Box>
        <Button
          disableElevation
          disabled={disabled || !(value < max)}
          color="secondary"
          variant="contained"
          sx={SpinButtonSx.buttonContainer}
          onClick={() => handleClick(true)}
        >
          <AddRounded />
        </Button>
      </Box>
    </Box>
  );
};

export default SpinButton;
