export interface User {
  id: Number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: null;
  created_by: null | string;
  updated_by: null | string;
  created_at: string;
  updated_at: string;
}

export interface UserToSubmit {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface UserToSignin {
  email: string;
  identifier: string;
}

export interface UserState {
  user: User | null;
}

export interface AddUserAction {
  type: string;
  payload: User | null;
}

export type UserActionTypes = AddUserAction;
