import { useConfirmationDisplay } from "../../hooks/useConfirmation.ts";
import ConfirmationDialogView from "./ConfirmationDialogView.tsx";
import type { DialogProps } from "@mui/material";

interface ConfirmationDialogProps {
  container?: DialogProps["container"];
}

const ConfirmationDialog = ({ container }: ConfirmationDialogProps) => {
  const { open, options, onConfirm, onCancel } = useConfirmationDisplay();
  return (
    <ConfirmationDialogView
      open={open}
      container={container}
      options={options}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default ConfirmationDialog;
