/* @flow */
import {
  type Actions,
  GOOGLE_SIGNIN,
  GOOGLE_SIGNIN_FAILED,
  LOGOUT,
  LOGOUT_FAILED,
} from "../types/thunks";
import type { State } from "../types/user";

const initialState: State = {
  loggedIn: false,
  user: null,
};

export default function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case GOOGLE_SIGNIN:
      return {
        loggedIn: true,
        user: {
          ...action.payload.user,
        },
      };
    case GOOGLE_SIGNIN_FAILED:
      return {
        loggedIn: false,
        user: null,
      };
    case LOGOUT: {
      return {
        loggedIn: false,
        user: null,
      };
    }
    case LOGOUT_FAILED: {
      return state;
    }
    default:
      return initialState;
  }
}
