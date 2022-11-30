import { toast } from 'react-toastify';
import {
  SetOrderAdressAction,
  SetOrderNumberAction,
  SetAdressAction,
  SetNumberAction,
  DeleteNumberAction,
  DeleteAdressAction,
  AddNumberAction,
  SetIsEditingNumberAction,
  SetIsEditingAdressAction,
  AdressToSubmit,
  ModifyAdressAction,
  ModifyNumberAction,
  AddAdressAction,
  Adress,
  OrderDetailsToSubmit,
  INumberToSubmit,
  INumber,
  ScheduleItem,
  SetOrderTimeAction,
} from '../types/checkout.types';

import {
  RemoveProductFromCartAction,
  AddToCartAction,
  Product,
  AddCouponsAction,
  MainActionTypes,
  ActiveModalComponent,
  CartActionTypes,
  Coupon,
  ToggleModalAction,
  ProductCategory,
  IncreaseProductAmountAction,
  DecreaseProductAmountAction,
} from '../types/main.types';

import {
  GetProductCategoriesParams,
  AddCategoriesAction,
  AddProductsAction,
  ProductsActionTypes,
  FetchProductSuccessAction,
} from '../types/products.types';
import { AppDispatch } from '../store';

import {
  UserToSubmit,
  UserActionTypes,
  User,
  UserToSignin,
} from '../types/user.types';

import {
  TOGGLE_MODAL,
  TOGGLE_CART,
  ADD_USER,
  ADD_TO_CART,
  ADD_COUPONS,
  ADD_CATEGORIES,
  ADD_PRODUCTS,
  ADD_NUMBER,
  FETCH_PRODUCT_STARTED,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILED,
  REMOVE_FROM_CART,
  INCREASE_AMOUNT,
  DECREASE_AMOUNT,
  DELETE_ADRESS,
  DELETE_NUMBER,
  ADD_ADRESS,
  SET_ADRESS,
  SET_NUMBER,
  SET_ORDER_ADRESS,
  SET_ORDER_NUMBER,
  SET_ORDER_TIME,
  POST_ORDER_STARTED,
  POST_ORDER_SUCCESS,
  MODIFY_ADRESS,
  SET_IS_EDITING_ADRESS,
  MODIFY_NUMBER,
  SET_IS_EDITING_NUMBER,
  SET_GET_PRODUCTS_CATEGORIES_PARAMS,
  SET_ACTIVE_MODAL_COMPONENT,
} from './actionTypes';
import { instance } from '../../api/api';

type GetProductCeategoriesParams =
  | { '_where[_or][0][category]': number | undefined }
  | { '_where[_or][1][category.parentCategory.id]': number | undefined }
  | { _limit: number | undefined };

export const addUser = (user: UserToSubmit) => instance.post('auth/local/register', user);

export const getGoogleUser = (idToken: string) => instance.get(`/auth/google/callback${idToken}`);

export const signinUser = (user: UserToSignin) => instance.post('auth/local', user);

export const toggleModal = (): ToggleModalAction => ({ type: TOGGLE_MODAL });

export const setActiveModalComponent = (
  activeComponent: ActiveModalComponent,
): MainActionTypes => ({
  type: SET_ACTIVE_MODAL_COMPONENT,
  payload: activeComponent,
});

export const toggleCart = (): CartActionTypes => ({ type: TOGGLE_CART });

export const addUserToStore = (user: User | null): UserActionTypes => ({
  type: ADD_USER,
  payload: user,
});

export const addCoupons = (coupons: Coupon[]): AddCouponsAction => ({
  type: ADD_COUPONS,
  payload: coupons,
});

export const addProducts = (products: Product[]): AddProductsAction => ({
  type: ADD_PRODUCTS,
  payload: products,
});

export const addCategories = (
  categories: ProductCategory[],
): AddCategoriesAction => ({
  type: ADD_CATEGORIES,
  payload: categories,
});

export const AddUserAction = (user: UserToSubmit) => async (dispatch: AppDispatch) => {
  const userInfo = await addUser(user);
  await dispatch(addUserToStore(userInfo.data.user));
  toast.success(`welcome ${userInfo.data.user.username}`);
  dispatch(toggleModal());
  localStorage.setItem('token', userInfo.data.jwt);
};

export const signinUserAction = (user: UserToSignin) => async (dispatch: AppDispatch) => {
  const userInfo = await signinUser(user);
  await dispatch(addUserToStore(userInfo.data.user));
  toast.success(`welcome ${userInfo.data.user.username}`);
  dispatch(toggleModal());
  localStorage.setItem('token', userInfo.data.jwt);
};

export const getGoogleUserAction = (idToken: string) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await getGoogleUser(idToken);
    await dispatch(addUserToStore(data.user));
    toast.success(`welcome ${data.user.username}`);
  } catch (error) {
    console.log('error occured');
  }
};

export const getCoupons = () => async (dispatch: AppDispatch) => {
  const { data } = await instance.get('coupons');
  dispatch(addCoupons(data));
};

export const setGetProductsCategoriesParams = (
  params: GetProductCategoriesParams,
): ProductsActionTypes => ({
  type: SET_GET_PRODUCTS_CATEGORIES_PARAMS,
  payload: params,
});

export const getProducts = (obj: { isChildCategory?: boolean; id?: number; productLimit?: number }) => async (dispatch: AppDispatch) => {
  const { isChildCategory = false, id, productLimit } = obj;
  let params: GetProductCeategoriesParams = isChildCategory
    ? { '_where[_or][0][category]': id }
    : { '_where[_or][1][category.parentCategory.id]': id };
  dispatch(setGetProductsCategoriesParams({ isChildCategory, id }));
  if (productLimit) params = { ...params, _limit: productLimit };
  const { data } = await instance.get('products', { params });
  dispatch(addProducts(data));
};

export const unselectProduct = (): FetchProductSuccessAction => ({
  type: FETCH_PRODUCT_SUCCESS,
  payload: null,
});

export const getProduct = (id: string) => async (dispatch: AppDispatch) => {
  dispatch({ type: FETCH_PRODUCT_STARTED });
  try {
    const { data } = await instance.get(`products/${id}`);
    const categoryId = data.category.id;
    dispatch({
      type: FETCH_PRODUCT_SUCCESS,
      payload: data,
    });
    const params = {
      '_where[_or][0][category]': categoryId,
    };
    const { data: productsData } = await instance.get('products', { params });
    dispatch(addProducts(productsData));
  } catch (error) {
    dispatch({ type: FETCH_PRODUCT_FAILED, payload: error });
  }
};

export const postOrder = (orderDetails: OrderDetailsToSubmit) => async (dispatch: AppDispatch): Promise<void> => {
  dispatch({ type: POST_ORDER_STARTED });
  try {
    const { data } = await instance.post('orders', orderDetails);
    dispatch({
      type: POST_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    toast.error('fill out all details about your order');
  }
};

export const getCategories = () => async (dispatch: AppDispatch) => {
  const { data } = await instance.get('categories');
  dispatch(addCategories(data));
};

export const addToCart = (product: Product): AddToCartAction => ({
  type: ADD_TO_CART,
  payload: product,
});

export const addAdress = (adress: Adress): AddAdressAction => ({
  type: ADD_ADRESS,
  payload: adress,
});

export const modifyAdress = (adress: AdressToSubmit): ModifyAdressAction => ({
  type: MODIFY_ADRESS,
  payload: adress,
});

export const modifyNumber = (number: INumberToSubmit): ModifyNumberAction => ({
  type: MODIFY_NUMBER,
  payload: number,
});

export const setIsEditingAdress = (
  bool: boolean,
): SetIsEditingAdressAction => ({
  type: SET_IS_EDITING_ADRESS,
  payload: bool,
});

export const setIsEditingNumber = (
  bool: boolean,
): SetIsEditingNumberAction => ({
  type: SET_IS_EDITING_NUMBER,
  payload: bool,
});

export const addNumber = (number: INumber): AddNumberAction => ({
  type: ADD_NUMBER,
  payload: number,
});

export const removeFromCart = (id: string): RemoveProductFromCartAction => ({
  type: REMOVE_FROM_CART,
  payload: id,
});

export const increaseAmount = (id: string): IncreaseProductAmountAction => ({
  type: INCREASE_AMOUNT,
  payload: id,
});

export const decreaseAmount = (id: string): DecreaseProductAmountAction => ({
  type: DECREASE_AMOUNT,
  payload: id,
});

export const deleteAdress = (id: string): DeleteAdressAction => ({
  type: DELETE_ADRESS,
  payload: id,
});

export const deleteNumber = (id: string): DeleteNumberAction => ({
  type: DELETE_NUMBER,
  payload: id,
});

export const setAdress = (title: string | null): SetAdressAction => ({
  type: SET_ADRESS,
  payload: title,
});

export const setNumber = (number: string): SetNumberAction => ({
  type: SET_NUMBER,
  payload: number,
});

export const setOrderAdress = (
  adress: Adress | null,
): SetOrderAdressAction => ({
  type: SET_ORDER_ADRESS,
  payload: adress,
});

export const setOrderNumber = (
  number: INumber | null,
): SetOrderNumberAction => ({
  type: SET_ORDER_NUMBER,
  payload: number,
});

export const setOrderTime = (time: ScheduleItem): SetOrderTimeAction => ({
  type: SET_ORDER_TIME,
  payload: time,
});
