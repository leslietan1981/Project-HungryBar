import { useCallback, useMemo } from "react";
import Big from "big.js";

import { calcSubtotal } from "../utils/calcUtils.ts";
import { getCheckedOptions } from "../utils/dataUtils.ts";
import type { ProductOptionResponse, ProductResponse } from "../types/api/product.types.ts";

export interface AddToCartProps {
  product: ProductResponse;
  options: Record<string, boolean>;
  quantity: number;
}

export interface CartItemProps extends AddToCartProps {
  id: string;
}

export interface UpdateCartItemProps {
  id: string;
  quantity?: number;
  options?: Record<string, boolean>;
}

export interface CartTotals {
  subtotal: number;
  serviceCharge: number;
  tax: number;
  total: number;
}

export interface UseCartOptions {
  serviceChargeRate?: number;
  taxRate?: number;
}

const buildCartItemId = (productId: string, options: Record<string, boolean>) =>
  `${productId}-${Object.entries(options)
    .map(([key, value]) => {
      if (value === true) return key;
    })
    .sort()
    .join("-")}`;

export const useCart = (
  cart: CartItemProps[],
  setCart: (updater: CartItemProps[] | ((prev: CartItemProps[]) => CartItemProps[])) => void,
  { serviceChargeRate = 0, taxRate = 0 }: UseCartOptions = {},
) => {
  const emptyCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  const addToCart = useCallback(
    ({ product, options, quantity }: AddToCartProps) => {
      const id: string = buildCartItemId(`${product.id}`, options);

      setCart((prev) => {
        const foundItemIdx = prev.findIndex((item: CartItemProps) => item.id === id);
        if (foundItemIdx !== -1) {
          return prev.toSpliced(foundItemIdx, 1, { id, product, options, quantity: prev[foundItemIdx].quantity + 1 });
        }
        return [...prev, { id, product, options, quantity }];
      });
    },
    [setCart],
  );

  const updateCartItem = useCallback(
    ({ id, quantity, options }: UpdateCartItemProps) => {
      setCart((prev) => {
        const foundItemIdx = prev.findIndex((item) => item.id === id);
        if (foundItemIdx === -1) return prev;

        const currentItem = prev[foundItemIdx];
        const nextOptions = options ?? currentItem.options;
        const nextQuantity = quantity ?? currentItem.quantity;

        if (nextQuantity <= 0) {
          return prev.toSpliced(foundItemIdx, 1);
        }

        const nextId = buildCartItemId(`${currentItem.product.id}`, nextOptions);

        if (nextId !== id) {
          const conflictItemIdx = prev.findIndex((item) => item.id === nextId);
          if (conflictItemIdx !== -1) {
            const currentItemRemoved = prev.toSpliced(foundItemIdx, 1);
            return currentItemRemoved.map((item) =>
              item.id === nextId ? { ...item, quantity: item.quantity + nextQuantity } : item,
            );
          }
        }

        return prev.toSpliced(foundItemIdx, 1, {
          ...currentItem,
          id: nextId,
          options: nextOptions,
          quantity: nextQuantity,
        });
      });
    },
    [setCart],
  );

  const cartTotals = useMemo<CartTotals>(() => {
    const subtotal = cart.reduce((sum, { product, options, quantity }) => {
      const checkedOptions: ProductOptionResponse[] = product.options
        ? getCheckedOptions(product.options, options)
        : [];
      return sum.plus(new Big(calcSubtotal(product.price, checkedOptions, quantity)));
    }, new Big(0));
    const serviceCharge = subtotal.times(serviceChargeRate);
    const tax = subtotal.times(taxRate);
    const total = subtotal.plus(serviceCharge).plus(tax);

    return {
      subtotal: subtotal.toNumber(),
      serviceCharge: serviceCharge.toNumber(),
      tax: tax.toNumber(),
      total: total.toNumber(),
    };
  }, [cart, serviceChargeRate, taxRate]);

  const cartItemCount = useMemo<number>(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  return { cart, emptyCart, addToCart, updateCartItem, cartTotals, cartItemCount };
};
