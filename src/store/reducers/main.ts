import {
  TOGGLE_MODAL,
  SET_ACTIVE_MODAL_COMPONENT,
  ADD_COUPONS,
} from '../actions/actionTypes';
import {
  ActiveModalComponent,
  MainReducerState,
  MainActionTypes,
} from '../types/main.types';

const initialState: MainReducerState = {
  isModalOpen: false,
  activeModalComponent: ActiveModalComponent.SIGNUP,
  coupons: [],
};

const mainReducer = (
  state = initialState,
  action: MainActionTypes,
): MainReducerState => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    case SET_ACTIVE_MODAL_COMPONENT:
      return {
        ...state,
        activeModalComponent: action.payload,
      };
    case ADD_COUPONS:
      return {
        ...state,
        coupons: action.payload,
      };
    default:
      return state;
  }
};

export default mainReducer;
