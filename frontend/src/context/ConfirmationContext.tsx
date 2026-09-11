import { createContext, useCallback, useMemo, useRef, useState } from "react";

export interface ConfirmOptions {
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

interface ConfirmationRequestValue {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

interface ConfirmationState {
  open: boolean;
  options: ConfirmOptions;
}

interface ConfirmationDisplayValue extends Required<ConfirmationState> {
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationRequestContext = createContext<ConfirmationRequestValue | null>(null);
export const ConfirmationDisplayContext = createContext<ConfirmationDisplayValue | null>(null);

const initialState: ConfirmationState = {
  open: false,
  options: {
    message: "",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
  },
};

interface ConfirmationProviderProps {
  children: React.ReactNode;
}

export const ConfirmationProvider = ({ children }: ConfirmationProviderProps) => {
  const [state, setState] = useState<ConfirmationState>(initialState);
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      (document.activeElement as HTMLElement)?.blur();
      resolveRef.current = resolve;
      setState({
        open: true,
        options: {
          message: options.message,
          confirmLabel: options.confirmLabel ?? "Confirm",
          cancelLabel: options.cancelLabel ?? "Cancel",
        },
      });
    });
  }, []);

  const settle = useCallback((value: boolean) => {
    resolveRef.current?.(value);
    resolveRef.current = null;
    setState((prev) => ({ ...prev, open: false }));
  }, []);

  const requestValue = useMemo(() => ({ confirm }), [confirm]);
  const displayValue = useMemo(
    () => ({ ...state, onConfirm: () => settle(true), onCancel: () => settle(false) }),
    [state, settle],
  );

  return (
    <ConfirmationRequestContext.Provider value={requestValue}>
      <ConfirmationDisplayContext.Provider value={displayValue}>{children}</ConfirmationDisplayContext.Provider>
    </ConfirmationRequestContext.Provider>
  );
};
