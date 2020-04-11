// @flow
import { createStore } from "redux";
import reducers from "./reducers";

// $FlowFixMe TODO: What's happening here?
export const store = createStore(reducers);

export default store;
