/* @flow */

export type Result = {
  objectId: ?number,
  objectType: "WORD" | "CHARACTER",
  text: string,
  answers: string,
  marks: Array<"CORRECT" | "INCORRECT">,
};

export type Results = {
  [key: string]: Result,
};

export type UserAnswer = {
  [key: string]: string,
};
