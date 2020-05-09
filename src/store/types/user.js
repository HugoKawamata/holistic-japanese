/* @flow */
import type { User as GoogleAuth } from "@react-native-community/google-signin";

// Non exact types because scopes may change in the future
// export type GoogleAuth = {
//   idToken: string,
//   scopes: Array<string>,
//   serverAuthCode: mixed, // No idea what this is meant to be
//   user: GoogleUser,
// };

export type { GoogleAuth };

export type GoogleUser = {|
  id: string,
  name: ?string,
  email: string,
  photo: ?string,
  familyName: ?string,
  givenName: ?string,
|};

export type State = {|
  loggedIn: boolean,
  user: ?GoogleUser,
|};
