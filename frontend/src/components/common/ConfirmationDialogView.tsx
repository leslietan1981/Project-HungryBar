import { Button, Dialog, DialogActions, DialogContent, Typography, type DialogProps } from "@mui/material";
import { animFadeAndSlideIn } from "../../transitions/transitionStyles.ts";
import type { ConfirmOptions } from "../../context/ConfirmationContext.tsx";

const dialogSlotProps: DialogProps["slotProps"] = {
  root: { sx: { position: "absolute" } },
  backdrop: { sx: { position: "absolute" } },
  container: { sx: { alignItems: "center" } },
  paper: {
    sx: {
      margin: "1.6rem",
      p: ".2rem 1.6rem .8rem",
      maxWidth: "90%",
      minHeight: "5lh",
      alignItems: "center",
      willChange: "opacity",
      ...animFadeAndSlideIn("up", "2px", 400),
    },
  },
};

interface ConfirmationDialogViewProps extends DialogProps {
  options: ConfirmOptions;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ConfirmationDialogView = ({ open, container, options, onConfirm, onCancel }: ConfirmationDialogViewProps) => {
  return (
    <Dialog container={container} disablePortal open={open} slotProps={dialogSlotProps} onClose={onCancel}>
      <DialogContent>
        <Typography>{options.message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onConfirm}>
          {options.confirmLabel}
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          {options.cancelLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialogView;
