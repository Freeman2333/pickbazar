import { toast } from 'react-toastify';
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
  SET_CHECKOUT_FORM,
  SET_ADRESS,
  SET_NUMBER,
  SET_ORDER_ADRESS,
  SET_ORDER_NUMBER,
  SET_ORDER_TIME,
  POST_ORDER_STARTED,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  MODIFY_ADRESS,
  SET_IS_EDITING_ADRESS,
  MODIFY_NUMBER,
  SET_IS_EDITING_NUMBER,
  SET_GET_PRODUCTS_CATEGORIES_PARAMS,
  SET_ACTIVE_MODAL_COMPONENT,
} from './actionTypes';
import { instance } from '../../api/api';

/* eslint-disable no-unused-expressions */

export const addUser = (user) => instance.post('auth/local/register', user);

export const getGoogleUser = (idToken) => instance.get(`/auth/google/callback${idToken}`);

export const signinUser = (user) => instance.post('auth/local', user);

export const toggleModal = () => ({ type: TOGGLE_MODAL });

export const setActiveModalComponent = (activeComponent) => ({
  type: SET_ACTIVE_MODAL_COMPONENT,
  payload: activeComponent,
});

export const toggleCart = () => ({ type: TOGGLE_CART });

export const addUserToStore = (user) => ({ type: ADD_USER, payload: user });

export const addCoupons = (coupons) => ({
  type: ADD_COUPONS,
  payload: coupons,
});

export const addProducts = (products) => ({
  type: ADD_PRODUCTS,
  payload: products,
});

export const addCategories = (categories) => ({
  type: ADD_CATEGORIES,
  payload: categories,
});

export const addUserAction = (user) => async (dispatch) => {
  const userInfo = await addUser(user);
  await dispatch(addUserToStore(userInfo.data.user));
  toast.success(`welcome ${userInfo.data.user.username}`);
  dispatch(toggleModal());
  localStorage.setItem('token', userInfo.data.jwt);
};

export const signinUserAction = (user) => async (dispatch) => {
  const userInfo = await signinUser(user);
  await dispatch(addUserToStore(userInfo.data.user));
  toast.success(`welcome ${userInfo.data.user.username}`);
  dispatch(toggleModal());
  localStorage.setItem('token', userInfo.data.jwt);
};

export const getGoogleUserAction = (idToken) => async (dispatch) => {
  try {
    const { data } = await getGoogleUser(idToken);
    await dispatch(addUserToStore(data.user));
    toast.success(`welcome ${data.user.username}`);
  } catch (error) {
    console.log('error occured');
  }
};

export const getCoupons = () => async (dispatch) => {
  const { data } = await instance.get('coupons');
  dispatch(addCoupons(data));
};

export const setGetProductsCategoriesParams = (params) => ({
  type: SET_GET_PRODUCTS_CATEGORIES_PARAMS,
  payload: params,
});

export const getProducts = (obj) => async (dispatch) => {
  const { isChildCategory = false, id, productLimit } = obj;
  let params = isChildCategory
    ? { '_where[_or][0][category]': id }
    : { '_where[_or][1][category.parentCategory.id]': id };
  dispatch(setGetProductsCategoriesParams({ isChildCategory, id }));
  productLimit && (params = { ...params, _limit: productLimit });
  const { data } = await instance.get('products', { params });
  dispatch(addProducts(data));
};

export const getProduct = (id) => async (dispatch) => {
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

export const postOrder = (orderDetails) => async (dispatch) => {
  dispatch({ type: POST_ORDER_STARTED });
  try {
    const { data } = await instance.post('orders', orderDetails);
    dispatch({
      type: POST_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: POST_ORDER_FAILED, payload: error });
    toast.error('fill out all details about your order');
  }
};

export const getCategories = () => async (dispatch) => {
  const { data } = await instance.get('categories');
  dispatch(addCategories(data));
};

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const addAdress = (adress) => ({
  type: ADD_ADRESS,
  payload: adress,
});

export const modifyAdress = (adress) => ({
  type: MODIFY_ADRESS,
  payload: adress,
});

export const modifyNumber = (number) => ({
  type: MODIFY_NUMBER,
  payload: number,
});

export const setIsEditingAdress = (bool) => ({
  type: SET_IS_EDITING_ADRESS,
  payload: bool,
});

export const setIsEditingNumber = (bool) => ({
  type: SET_IS_EDITING_NUMBER,
  payload: bool,
});

export const addNumber = (number) => ({
  type: ADD_NUMBER,
  payload: number,
});

export const removeFromCart = (product) => ({
  type: REMOVE_FROM_CART,
  payload: product,
});

export const increaseAmount = (id) => ({
  type: INCREASE_AMOUNT,
  payload: id,
});

export const decreaseAmount = (id) => ({
  type: DECREASE_AMOUNT,
  payload: id,
});

export const deleteAdress = (id) => ({
  type: DELETE_ADRESS,
  payload: id,
});

export const deleteNumber = (id) => ({
  type: DELETE_NUMBER,
  payload: id,
});

export const setAdress = (title) => ({
  type: SET_ADRESS,
  payload: title,
});

export const setNumber = (number) => ({
  type: SET_NUMBER,
  payload: number,
});

export const setOrderAdress = (adress) => ({
  type: SET_ORDER_ADRESS,
  payload: adress,
});

export const setOrderNumber = (number) => ({
  type: SET_ORDER_NUMBER,
  payload: number,
});

export const setCheckoutForm = (form) => ({
  type: SET_CHECKOUT_FORM,
  payload: form,
});

export const setOrderTime = (time) => ({
  type: SET_ORDER_TIME,
  payload: time,
});
   



