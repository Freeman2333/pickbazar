import {
  TOGGLE_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_AMOUNT,
  DECREASE_AMOUNT,
} from '../actions/actionTypes';
import { CartState, CartActionTypes } from '../types/main.types';

const initialState: CartState = {
  isCartOpen: false,
  cart: [],
  deliveryFee: 3,
};

const mainReducer = (state = initialState, action: CartActionTypes) => {
  switch (action.type) {
    case TOGGLE_CART:
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    case ADD_TO_CART: {
      const newItem = { ...action.payload, amount: 1 };
      return {
        ...state,
        cart: [...state.cart, newItem],
      };
    }
    case INCREASE_AMOUNT: {
      const tempCart2 = state.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      return {
        ...state,
        cart: tempCart2,
      };
    }
    case DECREASE_AMOUNT: {
      const tempCart3 = state.cart.map((item) => {
        if (item.id === action.payload) {
          const itemAmount = item.amount - 1 === 0 ? 1 : item.amount - 1;
          return { ...item, amount: itemAmount };
        }
        return item;
      });
      return {
        ...state,
        cart: tempCart3,
      };
    }
    case REMOVE_FROM_CART: {
      const tempCart = state.cart.filter((item) => item.id !== action.payload);
      return {
        ...state,
        cart: tempCart,
      };
    }

    default:
      return state;
  }
};

export default mainReducer;
