// @flow
import {
  type Actions,
  GOOGLE_SIGNIN,
  GOOGLE_SIGNIN_FAILED,
} from "../types/thunks";
import type { State } from "../types/user";

const initialState: State = {
  loggedIn: false,
  user: null,
};

export default function reducer(
  state: State = initialState,
  action: Actions
): State {
  switch (action.type) {
    case GOOGLE_SIGNIN:
      return {
        loggedIn: true,
        user: {
          email: action.payload.user.email,
          name: action.payload.user.name,
          givenName: action.payload.user.givenName,
          familyName: action.payload.user.familyName,
          userType: "google",
        },
      };
    case GOOGLE_SIGNIN_FAILED:
      return {
        loggedIn: false,
        user: null,
      };
    default:
      return initialState;
  }
}
