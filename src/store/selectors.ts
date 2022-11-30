import { createSelector, OutputSelector } from 'reselect';
import { RootState } from './reducers/index';
import { ProductInCart } from './types/main.types';
/* eslint max-len: ["error", { "code": 180 }] */
export const totalItemsSelector = createSelector(
  (state: RootState) => state.cart.cart,
  (cart) => cart.reduce((acc, prd) => acc + prd.amount, 0),
);

export const totalAmountSelector = createSelector(
  (state: RootState) => state.cart.cart,
  (cart: ProductInCart[]) => cart.reduce((acc, prd) => acc + prd.price * prd.amount, 0),
);

export const totalDiscountSelector = createSelector(
  (state: RootState) => state.cart.cart,
  (cart) => cart.reduce((acc, prod) => {
    const discountPercent = (prod.discount?.amount ?? 0) / 100;
    return acc + discountPercent * prod.price;
  }, 0),
);

export const totalSelector: OutputSelector<
  RootState,
  number,
  (res: number, res2: number, res3: number) => number
> = createSelector<RootState, number, number, number, number>(
  (state: RootState) => state.cart.deliveryFee,
  totalAmountSelector,
  totalDiscountSelector,
  (fee, subtotal, discount) => subtotal + fee - discount,
);

export const isInCartSelector = (
  id: string,
): OutputSelector<RootState, boolean, (res1: ProductInCart[]
) => boolean> => createSelector(
  (state: RootState) => state.cart.cart,
  (cart) => !!cart.find((item) => item.id === id),
);
