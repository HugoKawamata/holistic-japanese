// @flow
import type { GoogleAuth } from "../types/user";
import type { Dispatch, GetState } from "../types/store";

export function loadGoogleSignin(googleUserData: GoogleAuth): mixed {
  return (dispatch: Dispatch) =>
    Promise.resolve()
      .then((res) => dispatch({ type: "GOOGLE_SIGNIN", payload: res }))
      .catch((err) => {
        console.error("google signin failed: ", err);
      });
}
