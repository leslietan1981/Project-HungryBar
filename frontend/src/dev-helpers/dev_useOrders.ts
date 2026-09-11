import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";

import type { CartItemProps } from "../hooks/useCart.ts";
import { toLocalISODate } from "../utils/formatUtils.ts";
import type { OrderResponse, OrderState } from "../types/api/order.types.ts";
import type { ProductOptionResponse } from "../types/api/product.types.ts";

export const dev_useOrders = (devKey: string) => {
  const [orders, setOrders] = useLocalStorage<OrderResponse[]>(devKey, []);
  const [serial, setSerial] = useLocalStorage<number>(`${devKey}-serial`, 0);

  const emptyOrders = useCallback(() => {
    setOrders([]);
  }, [setOrders]);

  const addOrder = useCallback(
    (orderChit: CartItemProps[], tableNumber: string) => {
      const items = orderChit.map(({ id, product, options: selectedOptions, quantity }) => {
        const options: ProductOptionResponse[] = [];
        Object.entries(selectedOptions).map(([optId, value]) => {
          if (value === true && product.options) {
            const foundOption = product.options.find((option) => String(option.option_id) === optId);
            if (foundOption) options.push(foundOption);
          }
        });
        return {
          item_id: id,
          name: product.name,
          options,
          quantity,
          price: product.price,
          is_served: false,
        };
      });
      const orderId = serial;
      setSerial((prev) => prev + 1);
      setOrders((prev) => {
        return [
          ...prev,
          { id: orderId, table: tableNumber, created_at: toLocalISODate(new Date()), order_status: "new", items },
        ];
      });
    },
    [setOrders],
  );

  const getOrdersByOrderState = useCallback(
    (orderState: OrderState) => {
      return orders.filter((item) => item.order_status === orderState);
    },
    [orders],
  );

  const updateOrderStatus = useCallback(
    (orderId: number, orderState: OrderState) => {
      setOrders((prev) => {
        const foundOrderIdx = prev.findIndex(({ id }) => id === orderId);
        if (foundOrderIdx === -1) return prev;

        return prev.toSpliced(foundOrderIdx, 1, {
          ...prev[foundOrderIdx],
          order_status: orderState,
        });
      });
    },
    [setOrders],
  );

  const updateOrderItemServedStatus = useCallback(
    (orderId: number, itemId: string, isServed: boolean) => {
      setOrders((prev) => {
        const foundOrderIdx = prev.findIndex(({ id }) => id === orderId);
        if (foundOrderIdx === -1) return prev;

        const foundOrder = prev[foundOrderIdx];
        const foundItemIdx = foundOrder.items.findIndex(({ item_id }) => item_id === itemId);
        if (foundItemIdx === -1) return prev;

        const items = foundOrder.items.toSpliced(foundItemIdx, 1, {
          ...foundOrder.items[foundItemIdx],
          is_served: isServed,
        });

        return prev.toSpliced(foundOrderIdx, 1, {
          ...foundOrder,
          items,
        });
      });
    },
    [setOrders],
  );

  const getOrdersCountByOrderState = useCallback(
    (orderState: OrderState) => {
      return orders.reduce((count, { order_status }) => (order_status === orderState ? count + 1 : count), 0);
    },
    [orders],
  );

  return {
    orders,
    emptyOrders,
    addOrder,
    getOrdersByOrderState,
    updateOrderStatus,
    updateOrderItemServedStatus,
    getOrdersCountByOrderState,
  };
};
