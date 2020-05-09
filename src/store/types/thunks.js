/* @flow */
import { type GoogleAuth } from "./user";

export const GOOGLE_SIGNIN = "GOOGLE_SIGNIN";
export const GOOGLE_SIGNIN_FAILED = "GOOGLE_SIGNIN_FAILED";

export type GoogleSignin = {
  payload: GoogleAuth, // TODO: Get the type of whatever comes back from google
  type: typeof GOOGLE_SIGNIN,
};

export type GoogleSigninFailed = {
  type: typeof GOOGLE_SIGNIN_FAILED,
};

export type Actions = GoogleSigninFailed | GoogleSignin;
