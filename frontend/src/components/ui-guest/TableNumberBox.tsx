import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { BoxProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { body1Sx, title2CSx } from "../../sx/typographySx.ts";
import { useState } from "react";
import { TextFieldSlotProps } from "../../sx/guestUI/TextFieldSlotProps.ts";
import { isDisabledSx } from "../../sx/disabledSx.ts";

const TableNumberBoxSx = {
  wrapper: {
    width: "100%",
  },
  base: {
    bgcolor: "surface.darkTranslucent",
    border: "1px solid",
    borderColor: "border.dark",
    backdropFilter: "blur(10px) opacity(100%)",
    WebkitBackdropFilter: "blur(10px) opacity(100%)",
  },
  layout: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    p: "1rem 1.5rem 2rem",
  },
  dividerLayout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    mt: "1rem",
  },
  dividerLine: {
    height: "1px",
    bgcolor: "border.dark",
    width: "100%",
  },
  dividerText: {
    color: "border.light",
    letterSpacing: ".1rem",
    textIndent: ".1rem",
  },
} satisfies Record<string, SxProps<Theme>>;

interface TableNumberBoxProps extends Omit<BoxProps, "onSubmit"> {
  onSubmit?: (tableNumber: string) => void;
}

const tableNumberMaxLength = 4;
const tableHelperTextDefault = " ";

const TableNumberBox = ({ ref, onSubmit }: TableNumberBoxProps) => {
  const [value, setValue] = useState<string>("");
  const [tableNumberError, setTableNumberError] = useState<string>(tableHelperTextDefault);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    const newValue = e.target.value;

    if (newValue.length > tableNumberMaxLength || !(newValue === "" || /^[0-9\b]+$/.test(newValue))) return;

    setTableNumberError(tableHelperTextDefault);
    setValue(newValue);
  };

  const isValidTable = value.length > 0;

  const handleCheck = () => {
    setTableNumberError(isValidTable ? tableHelperTextDefault : "Please approach our staff should you need help.");
  };

  const handleSubmit = () => {
    onSubmit?.(value);
  };

  return (
    <Box ref={ref} sx={TableNumberBoxSx.wrapper}>
      <Paper elevation={2} sx={TableNumberBoxSx.base}>
        <Box sx={TableNumberBoxSx.layout}>
          <Typography sx={title2CSx}>Table Number</Typography>
          <TextField
            id="table-number"
            label="What table are you at?"
            helperText={tableNumberError}
            value={value}
            onChange={handleChange}
            onBlur={handleCheck}
            slotProps={TextFieldSlotProps.primaryAlt}
          />
          <Button
            color="primaryAlt"
            variant="contained"
            sx={[body1Sx, !isValidTable && isDisabledSx]}
            onClick={handleSubmit}
          >
            Next
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default TableNumberBox;
