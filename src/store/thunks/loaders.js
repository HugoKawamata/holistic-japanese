// @flow
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-community/google-signin";
import type { GoogleAuth } from "../types/user";
import type { Dispatch, GetState } from "../types/store";

export function loadGoogleSignin(
  idToken: string,
  googleAuth: GoogleAuth
): mixed {
  return (dispatch: Dispatch) => {
    console.log("dispatched google sign in");
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
      .then((user) => {
        dispatch({ type: "GOOGLE_SIGNIN", payload: googleAuth });
      })
      .catch((err) => {
        console.error("Google Sign In Failed:", err);
        dispatch({ type: "GOOGLE_SIGNIN_FAILED" });
      });
  };
}
