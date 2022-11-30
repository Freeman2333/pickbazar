import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import main from './main';
import user from './user';
import products from './products';
import cart from './cart';
import checkout from './checkout';
import { CartActionTypes, CartState } from '../types/main.types';

const cartPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['isCartOpen'],
};

const rootReducer = combineReducers({
  main,
  user,
  products,
  checkout,
  cart: persistReducer<CartState, CartActionTypes>(cartPersistConfig, cart),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
