// @flow
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-community/google-signin";
import type { GoogleAuth } from "../types/user";
import type { Dispatch, GetState } from "../types/store";

export function loadGoogleSignin(): mixed {
  return (dispatch: Dispatch) => {
    GoogleSignin.hasPlayServices();
    return GoogleSignin.signIn().then((googleUserData: GoogleAuth) => {
      dispatch({ type: "GOOGLE_SIGNIN", payload: googleUserData });
    });
  };
}
