import { ADD_USER } from '../actions/actionTypes';
import { UserState, UserActionTypes } from '../types/user.types';

const initialState: UserState = {
  user: null,
};

const userReducer = (
  state = initialState,
  { type, payload }: UserActionTypes,
): UserState => {
  switch (type) {
    case ADD_USER:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
