import {
  POST_ORDER_STARTED,
  POST_ORDER_SUCCESS,
  DELETE_NUMBER,
  SET_ADRESS,
  SET_NUMBER,
  SET_ORDER_ADRESS,
  SET_ORDER_NUMBER,
  SET_ORDER_TIME,
  ADD_ADRESS,
  ADD_NUMBER,
  MODIFY_ADRESS,
  MODIFY_NUMBER,
  SET_IS_EDITING_ADRESS,
  DELETE_ADRESS,
  SET_IS_EDITING_NUMBER,
} from '../actions/actionTypes';
import { ProductInCart } from './main.types';

export interface AdressToSubmit {
  title: string;
  adress: string;
}

export interface Adress extends AdressToSubmit {
  id: string;
}

export interface INumberToSubmit {
  number: string;
}
export interface INumber extends INumberToSubmit {
  id: string;
}

export interface ScheduleItem {
  id: number;
  title: string;
  time: string;
}
export interface OrderDetails {
  id: number;
  address: Adress | null;
  when: string;
  phone: string;
  email: string;
  buyer: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
  products: any[];
}

export interface CheckoutState {
  adresses: Adress[];
  numbers: INumber[];
  adress: string | null;
  isEditingAdress: boolean;
  isEditingNumber: boolean;
  number: string;
  orderNumber: INumber | null;
  orderAdress: Adress | null;
  orderTime: ScheduleItem | null;
  paymentType: string[];
  orderDetails: OrderDetails | null;
  schedules: ScheduleItem[];
}

export interface OrderDetailsToSubmit {
  address: string;
  when: string;
  products: ProductInCart[];
  phone: string;
  email: string;
}

export interface AddAdressAction {
  type: typeof ADD_ADRESS;
  payload: Adress;
}

export interface AddNumberAction {
  type: typeof ADD_NUMBER;
  payload: INumber;
}

export interface ModifyAdressAction {
  type: typeof MODIFY_ADRESS;
  payload: AdressToSubmit;
}
export interface ModifyNumberAction {
  type: typeof MODIFY_NUMBER;
  payload: INumberToSubmit;
}
export interface SetIsEditingAdressAction {
  type: typeof SET_IS_EDITING_ADRESS;
  payload: boolean;
}

export interface SetIsEditingNumberAction {
  type: typeof SET_IS_EDITING_NUMBER;
  payload: boolean;
}

export interface DeleteAdressAction {
  type: typeof DELETE_ADRESS;
  payload: string;
}

export interface DeleteNumberAction {
  type: typeof DELETE_NUMBER;
  payload: string;
}

export interface SetAdressAction {
  type: typeof SET_ADRESS;
  payload: string | null;
}

export interface SetNumberAction {
  type: typeof SET_NUMBER;
  payload: string;
}

export interface SetOrderAdressAction {
  type: typeof SET_ORDER_ADRESS;
  payload: Adress | null;
}

export interface SetOrderNumberAction {
  type: typeof SET_ORDER_NUMBER;
  payload: INumber | null;
}

export interface SetOrderTimeAction {
  type: typeof SET_ORDER_TIME;
  payload: ScheduleItem;
}

export interface PostOrderStarted {
  type: typeof POST_ORDER_STARTED;
}

export interface PostOrderSuccessAction {
  type: typeof POST_ORDER_SUCCESS;
  payload: OrderDetails;
}

export type CheckoutActionTypes =
  | AddAdressAction
  | AddNumberAction
  | ModifyAdressAction
  | ModifyNumberAction
  | SetIsEditingAdressAction
  | SetIsEditingNumberAction
  | AddAdressAction
  | DeleteAdressAction
  | DeleteNumberAction
  | SetAdressAction
  | SetNumberAction
  | SetOrderAdressAction
  | SetOrderNumberAction
  | SetOrderTimeAction
  | PostOrderSuccessAction
  | PostOrderStarted;
