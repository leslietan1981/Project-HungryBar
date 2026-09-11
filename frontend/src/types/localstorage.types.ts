import type { CartItemProps } from "../hooks/useCart.ts";

export interface LocalStorageData {
  expire_at: string;
  table: string;
  cart: CartItemProps[];
  orders: number[];
}
