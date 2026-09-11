import { useContext } from "react";
import { DeviceModeContext, type DeviceModeContextValue } from "../context/DeviceModeContext";

export const useDeviceMode = (): DeviceModeContextValue => {
  const ctx = useContext(DeviceModeContext);
  if (!ctx) {
    throw new Error("useDeviceMode must be used within a DeviceModeProvider");
  }
  return ctx;
};
