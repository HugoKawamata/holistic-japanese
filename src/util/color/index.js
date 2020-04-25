// @flow
import {
  success,
  warning,
  danger,
  grey,
  purple,
  action,
  yellow,
} from "./system";

export default {
  // GENERIC NAMES
  NICE_DANGER: danger.d400,
  DANGER: danger.d500,
  SUCCESS: success.s600,
  WARNING: warning.w500,
  ACTION: action.a500,
  WHITE: grey.g000,
  PURPLE: purple.p500,
  PLACEHOLDER: grey.g300,
  SHADOW: grey.g800,

  // INPUTS
  INCORRECT_INPUT_BG: danger.d100,

  // BUTTONS
  BUTTON_S: success.s600,
  BUTTON_S_RIPPLE: success.s700,
  BUTTON_A: action.a500,
  BUTTON_A_RIPPLE: action.a600,
  BUTTON_W: warning.w500,
  BUTTON_W_RIPPLE: warning.w600,
  BUTTON_D: danger.d400,
  BUTTON_D_RIPPLE: danger.d500,
  BUTTON_DISABLED: grey.g400,
  BUTTON_DISABLED_RIPPLE: grey.g600,

  // TEXT COLOURS
  TEXT_S: success.s700,
  TEXT_A: action.a600,
  TEXT_D: danger.d500,
  TEXT_W: warning.w600,

  // TEXT GREY
  TEXT_L: grey.g400,
  TEXT_M: grey.g700,
  TEXT: grey.g800,
  TEXT_DARK: grey.g999,

  COMPLETE_CELL: yellow.y500,
  COMPLETE_CELL_SHADOW: yellow.y300,
  INCOMPLETE_CELL: grey.g100,
};
