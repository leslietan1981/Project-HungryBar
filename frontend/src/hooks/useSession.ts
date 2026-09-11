import { useLocalStorage } from "usehooks-ts";
import type { LocalStorageData } from "../types/localstorage.types.ts";
import { useCallback } from "react";
import type { CartItemProps } from "./useCart.ts";

const getExpiry = () => {
  const date = new Date();
  date.setHours(date.getHours() + 3);
  return date.toISOString();
};

export const useSession = () => {
  const expiry = getExpiry();
  const [session, setSession] = useLocalStorage<LocalStorageData>(import.meta.env.VITE_LOCALSTORAGE_KEY, {
    expire_at: expiry,
    table: "",
    cart: [],
    orders: [],
  });

  const checkSession = useCallback(
    (tableNumber: string | null) => {
      setSession((prev) => {
        if (!tableNumber) return prev;

        const now = Date.now();
        const expireAtMs = prev.expire_at ? new Date(prev.expire_at).getTime() : 0;
        const isExpired = !prev.expire_at || now >= expireAtMs;
        const assignTable = !prev.table || tableNumber !== prev.table;

        const newSession = (): LocalStorageData => ({
          expire_at: getExpiry(),
          table: tableNumber,
          cart: [],
          orders: [],
        });

        if (isExpired || assignTable) return newSession();

        return prev;
      });
    },
    [setSession],
  );

  const setCart = useCallback(
    (updater: CartItemProps[] | ((prev: CartItemProps[]) => CartItemProps[])) => {
      setSession((prev) => ({
        ...prev,
        cart: typeof updater === "function" ? updater(prev.cart) : updater,
      }));
    },
    [setSession],
  );

  return { session, setSession, checkSession, setCart };
};
