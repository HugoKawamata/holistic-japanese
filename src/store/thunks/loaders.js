/* @flow */
import type { GoogleAuth } from "../types/user";
import type { Dispatch } from "../types/store";

export function loadGoogleSignin(
  idToken: string,
  googleAuth: GoogleAuth
): mixed {
  return (dispatch: Dispatch) => {
    fetch(
      "http://ec2-52-63-127-15.ap-southeast-2.compute.amazonaws.com:4000/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          id_token: idToken,
        },
      }
    )
      .then(() => {
        dispatch({ type: "GOOGLE_SIGNIN", payload: googleAuth });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error("Google Sign In Failed:", err);
        dispatch({ type: "GOOGLE_SIGNIN_FAILED" });
      });
  };
}

export function logout() {
  return (dispatch: Dispatch) => {
    fetch(
      "http://ec2-52-63-127-15.ap-southeast-2.compute.amazonaws.com:4000/logout",
      {
        method: "POST",
      }
    )
      .then(() => {
        dispatch({ type: "LOGOUT" });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error("LOGOUT failed", err);
        dispatch({ type: "LOGOUT_FAILED" });
      });
  };
}
