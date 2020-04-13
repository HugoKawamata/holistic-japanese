// @flow
import { success, warning, danger, grey, purple, action } from "./system";

export default {
  // GENERIC NAMES
  NICE_DANGER: danger.d400,
  DANGER: danger.d500,
  SUCCESS: success.s600,
  WARNING: warning.w500,
  ACTION: action.a500,
  WHITE: grey.g000,

  // BUTTONS
  BUTTON_S: success.s600,
  BUTTON_A: action.a500,
  BUTTON_W: warning.w500,
  BUTTON_D: danger.d400,

  // TEXT
  TEXT_S: success.s700,
  TEXT_A: action.a600,
  TEXT_D: danger.d500,
  TEXT_W: warning.w600,
};
