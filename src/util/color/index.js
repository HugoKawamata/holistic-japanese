// @flow
import {
  success,
  warning,
  red,
  grey,
  purple,
  action,
  yellow,
  sakura,
} from "./system";

export default {
  // GENERIC NAMES
  NICE_RED: red.r400,
  RED: red.r500,
  SUCCESS: success.s600,
  WARNING: warning.w500,
  ACTION: action.a500,
  WHITE: grey.g000,
  BLACK: grey.g999,
  PURPLE: purple.p500,
  PLACEHOLDER: grey.g300,
  SHADOW: grey.g800,

  // For subtle emphasis
  EMPHA_BG: sakura.sa100,
  HINT_BG: grey.g075,

  // Navbar
  NAVBAR: sakura.sa100,
  NAVBAR_TEXT: sakura.sa600,

  // INPUTS
  INCORRECT_INPUT_BG: red.r100,

  // BUTTONS
  BUTTON_S: success.s600,
  BUTTON_S_RIPPLE: success.s700,
  BUTTON_A: action.a500,
  BUTTON_A_RIPPLE: action.a600,
  BUTTON_W: warning.w500,
  BUTTON_W_RIPPLE: warning.w600,
  BUTTON_R: red.r500,
  BUTTON_R_RIPPLE: red.r500,
  BUTTON_DISABLED: grey.g400,
  BUTTON_DISABLED_RIPPLE: grey.g600,

  // TEXT COLOURS
  TEXT_S: success.s700,
  TEXT_A: action.a600,
  TEXT_R: red.r500,
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
