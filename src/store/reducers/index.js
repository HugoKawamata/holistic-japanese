/* @flow */

import { combineReducers } from "redux";
import user from "./user";

const reducer = {
  user,
};

export type Reducer = typeof reducer;

// $FlowFixMe TODO: Fix the types here
export default combineReducers(reducer);
