/* @flow */
import type { Dispatch as RDispatch } from "redux";
import type { Actions } from "./thunks";
import type { State as UserState } from "./user";

export type State = {
  user: UserState,
};

export type GetState = () => State;
// eslint-disable-next-line no-use-before-define
export type Dispatch = RDispatch<Actions> & Thunk<Actions>;

type Thunk<A> = ((Dispatch, GetState) => ?Promise<A>) => A;
