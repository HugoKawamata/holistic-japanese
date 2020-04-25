// @flow

export type Results = {
  [key: string]: Result,
};

export type Result = {
  objectId: ?number,
  objectType: "WORD" | "CHARACTER",
  text: string,
  answers: any,
  results: Array<"CORRECT" | "INCORRECT">,
};
