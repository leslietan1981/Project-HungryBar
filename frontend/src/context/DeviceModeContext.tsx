import { createContext, useMemo, type ReactNode } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme, type Theme } from "@mui/material/styles";

export type DeviceMode = "mobile" | "tablet" | "desktop";

export interface DeviceModeContextValue {
  mode: DeviceMode;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const DeviceModeContext = createContext<DeviceModeContextValue | null>(null);

interface DeviceModeProviderProps {
  children: ReactNode;
}

export const DeviceModeProvider = ({ children }: DeviceModeProviderProps) => {
  const theme: Theme = useTheme();
  const isMobileQuery = useMediaQuery(theme.breakpoints.down("sm"));
  const isTabletQuery = useMediaQuery(theme.breakpoints.between("sm", "lg"));

  const value = useMemo<DeviceModeContextValue>(() => {
    const mode: DeviceMode = isMobileQuery ? "mobile" : isTabletQuery ? "tablet" : "desktop";
    return {
      mode,
      isMobile: mode === "mobile",
      isTablet: mode === "tablet",
      isDesktop: mode === "desktop",
    };
  }, [isMobileQuery, isTabletQuery]);

  return <DeviceModeContext.Provider value={value}>{children}</DeviceModeContext.Provider>;
};
