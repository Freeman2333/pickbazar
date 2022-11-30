import {
  FETCH_PRODUCT_FAILED,
  ADD_CATEGORIES,
  ADD_PRODUCTS,
  FETCH_PRODUCT_STARTED,
  FETCH_PRODUCT_SUCCESS,
  SET_GET_PRODUCTS_CATEGORIES_PARAMS,
} from '../actions/actionTypes';

import { Product, ProductCategory } from './main.types';

export interface GetProductCategoriesParams {
  isChildCategory?: boolean;
  id?: number;
}

export interface ProductsState {
  categories: ProductCategory[];
  products: Product[];
  getProductCategoriesParams: GetProductCategoriesParams | null;
  product: Product | null;
  isProductLoading: boolean;
}

export interface AddCategoriesAction {
  type: typeof ADD_CATEGORIES;
  payload: ProductCategory[];
}

interface FetchProductStartedAction {
  type: typeof FETCH_PRODUCT_STARTED;
}

export interface FetchProductSuccessAction {
  type: typeof FETCH_PRODUCT_SUCCESS;
  payload: Product | null;
}

export interface AddProductsAction {
  type: typeof ADD_PRODUCTS;
  payload: Product[];
}

export interface SetGetProductCategoriesAction {
  type: typeof SET_GET_PRODUCTS_CATEGORIES_PARAMS;
  payload: GetProductCategoriesParams;
}

export interface GetchProductFailedAction {
  type: typeof FETCH_PRODUCT_FAILED;
  payload: any;
}

export type ProductsActionTypes =
  | AddCategoriesAction
  | FetchProductStartedAction
  | FetchProductSuccessAction
  | SetGetProductCategoriesAction
  | AddProductsAction
  | GetchProductFailedAction;
