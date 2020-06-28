/* @flow */

// Splots are words that get slotted into answers to make the
// correct answers different depending on your account settings.
// e.g. `me` and `meFuri` will be based on gender: 私・僕
export type Splots = {|
  me: string,
  meFuri: string,
|};
