// @flow

// Non exact types because scopes may change in the future
export type GoogleAuth = {
  idToken: string,
  scopes: Array<string>,
  serverAuthCode: mixed, // No idea what this is meant to be
  user: GoogleUser,
};

export type GoogleUser = {
  email: string,
  familyName?: ?string,
  givenName?: ?string,
  id: string,
  name: string,
  photo: ?string,
};

type User = {|
  email: string,
  name: string,
  givenName?: ?string,
  familyName?: ?string,
  userType: "google",
|};

export type State = {|
  loggedIn: boolean,
  user: ?User,
|};
