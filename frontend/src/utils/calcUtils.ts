import Big from "big.js";
import type { ProductOptionResponse } from "../types/api/product.types.ts";
import type { OrderResponse } from "../types/api/order.types.ts";

export const calcSubtotal = (basePrice: number, options: ProductOptionResponse[], quantity: number): number => {
  if (options.length === 0) return new Big(basePrice).times(quantity).toNumber();

  const unitPrice = options.reduce((accumul, { price }) => accumul.plus(price), new Big(basePrice));
  return unitPrice.times(quantity).toNumber();
};

export const getOrderTotals = (order: OrderResponse, serviceChargeRate: number = 0, taxRate: number = 0) => {
  const subtotal = order.items.reduce((sum, { price, options, quantity }) => {
    return sum.plus(new Big(calcSubtotal(price, options, quantity)));
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
};

export const getOrderItemsCount = (order: OrderResponse) =>
  order.items.reduce((sum, { quantity }) => sum + quantity, 0);

export const getPendingOrderItemsCount = (order: OrderResponse) =>
  order.items.reduce((sum, { is_served, quantity }) => (!is_served ? sum + quantity : sum), 0);
