/* @flow */

export type Result = {
  objectId: ?number,
  objectType: "WORD" | "CHARACTER" | "SENTENCE",
  text: string,
  answers: Array<string>,
  marks: Array<"CORRECT" | "INCORRECT">,
};

export type Results = {
  [key: string]: Result,
};

export type UserAnswer = {
  [key: string]: string,
};
