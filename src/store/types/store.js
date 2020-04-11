// @flow
import type { Dispatch as RDispatch } from "redux";
import type { State as UserState } from "./user";
import type { Actions } from "../types/thunks";

export type State = {
  user: UserState,
};

export type GetState = () => State;
export type Dispatch = RDispatch<Actions> & Thunk<Actions>;

type Thunk<A> = ((Dispatch, GetState) => ?Promise<A>) => A;
