import { useContext } from "react";
import { ConfirmationDisplayContext, ConfirmationRequestContext } from "../context/ConfirmationContext.tsx";

export const useConfirmation = () => {
  const ctx = useContext(ConfirmationRequestContext);
  if (!ctx) {
    throw new Error("useConfirmation must be used within a ConfirmationProvider");
  }
  return ctx;
};

export const useConfirmationDisplay = () => {
  const ctx = useContext(ConfirmationDisplayContext);
  if (!ctx) throw new Error("useConfirmationDisplay must be used within a ConfirmationProvider");
  return ctx;
};
