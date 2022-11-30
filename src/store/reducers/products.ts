import { ProductsActionTypes, ProductsState } from '../types/products.types';

import {
  ADD_CATEGORIES,
  ADD_PRODUCTS,
  FETCH_PRODUCT_STARTED,
  FETCH_PRODUCT_SUCCESS,
  SET_GET_PRODUCTS_CATEGORIES_PARAMS,
} from '../actions/actionTypes';

const initialState: ProductsState = {
  categories: [],
  products: [],
  getProductCategoriesParams: null,
  product: null,
  isProductLoading: false,
};

const productsReducer = (
  state = initialState,
  action: ProductsActionTypes,
): ProductsState => {
  switch (action.type) {
    case ADD_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case ADD_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case FETCH_PRODUCT_STARTED:
      return {
        ...state,
        isProductLoading: true,
      };
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        isProductLoading: false,
      };
    case SET_GET_PRODUCTS_CATEGORIES_PARAMS:
      return {
        ...state,
        getProductCategoriesParams: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
