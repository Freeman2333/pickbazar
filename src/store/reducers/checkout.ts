import { CheckoutActionTypes, CheckoutState } from '../types/checkout.types';
import {
  ADD_ADRESS,
  ADD_NUMBER,
  SET_ADRESS,
  DELETE_ADRESS,
  DELETE_NUMBER,
  SET_ORDER_ADRESS,
  SET_ORDER_NUMBER,
  SET_ORDER_TIME,
  SET_NUMBER,
  POST_ORDER_SUCCESS,
  MODIFY_ADRESS,
  SET_IS_EDITING_ADRESS,
  MODIFY_NUMBER,
  SET_IS_EDITING_NUMBER,
} from '../actions/actionTypes';

const initialState: CheckoutState = {
  adresses: [],
  numbers: [],
  adress: null,
  isEditingAdress: false,
  isEditingNumber: false,
  number: '',
  orderNumber: null,
  orderAdress: null,
  orderTime: null,
  paymentType: ['cash'],
  orderDetails: null,
  schedules: [
    { title: 'Express-Delivery', time: '90 min express delivery', id: 0 },
    { title: '8am-11am', time: '8:00 AM - 11:00 AM', id: 1 },
    { title: '11am-2pm', time: '11:00 AM - 2:00 PM', id: 2 },
    { title: '2pm-5pm', time: '2:00 PM - 5:00 PM', id: 3 },
    { title: '8am-11am', time: '8:00 AM - 11:00 AM', id: 4 },
    { title: '11am-2pm', time: '11:00 AM - 2:00 PM', id: 5 },
  ],
};

const checkoutReducer = (
  state = initialState,
  action: CheckoutActionTypes,
): CheckoutState => {
  switch (action.type) {
    case ADD_ADRESS:
      return {
        ...state,
        adresses: [action.payload, ...state.adresses],
      };
    case ADD_NUMBER:
      return {
        ...state,
        numbers: [action.payload, ...state.numbers],
      };
    case SET_ADRESS:
      return {
        ...state,
        adress: action.payload,
      };
    case MODIFY_ADRESS: {
      const tempAdresses = state.adresses.map((adr) => {
        if (adr.id === state.adress) {
          return { ...adr, ...action.payload };
        }
        return adr;
      });
      return {
        ...state,
        adresses: tempAdresses,
      };
    }
    case MODIFY_NUMBER: {
      const tempNumbers = state.numbers.map((num) => {
        if (num.id === state.number) {
          return { ...num, ...action.payload };
        }
        return num;
      });
      return {
        ...state,
        numbers: tempNumbers,
      };
    }
    case SET_IS_EDITING_ADRESS:
      return {
        ...state,
        isEditingAdress: action.payload,
      };
    case SET_IS_EDITING_NUMBER:
      return {
        ...state,
        isEditingNumber: action.payload,
      };
    case SET_NUMBER:
      return {
        ...state,
        number: action.payload,
      };
    case SET_ORDER_ADRESS:
      return {
        ...state,
        orderAdress: action.payload,
      };
    case SET_ORDER_NUMBER:
      return {
        ...state,
        orderNumber: action.payload,
      };
    case SET_ORDER_TIME:
      return {
        ...state,
        orderTime: action.payload,
      };
    case DELETE_ADRESS: {
      const tempAdresses2 = state.adresses.filter(
        (adr) => adr.id !== action.payload,
      );
      return {
        ...state,
        adresses: tempAdresses2,
      };
    }
    case DELETE_NUMBER: {
      const tempNumbers2 = state.numbers.filter(
        (num) => num.id !== action.payload,
      );
      return {
        ...state,
        numbers: tempNumbers2,
      };
    }
    case POST_ORDER_SUCCESS:
      return {
        ...state,
        orderDetails: action.payload,
      };
    default:
      return state;
  }
};

export default checkoutReducer;
