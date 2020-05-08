// @flow

export type Results = {
  [key: string]: Result,
};

export type Result = {
  objectId: ?number,
  objectType: "WORD" | "CHARACTER",
  text: string,
  answers: any,
  marks: Array<"CORRECT" | "INCORRECT">,
};

export type UserAnswer = {
  [key: string]: string,
};
