import type { ProductOptionResponse } from "./product.types.ts";

export type OrderState = "new" | "accepted" | "completed" | "voided";

export interface OrderItemResponse {
  item_id: string;
  name: string;
  options: ProductOptionResponse[];
  quantity: number;
  price: number;
  is_served: boolean;
}

export interface OrderResponse {
  id: number;
  table: string;
  created_at: string;
  order_status: OrderState;
  items: OrderItemResponse[];
}
