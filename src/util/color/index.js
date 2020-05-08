// @flow
import { primary, grey, special, secondary, yellow } from "./system";

export default {
  // GENERIC NAMES
  SOFT_PRIMARY: primary.p400,
  PRIMARY: primary.p500,
  WHITE: grey.g000,
  BLACK: grey.g999,
  PURPLE: secondary.s500,
  PLACEHOLDER: grey.g300,
  SHADOW: grey.g800,
  SCREEN_BACKGROUND: grey.g025,

  // For subtle emphasis
  EMPHA_BG: primary.p100,
  HINT_BG: grey.g075,
  KANA_Q_BG: secondary.s500,

  // Navbar
  NAVBAR: grey.g000,
  NAVBAR_TEXT: grey.g999,
  ACTIVE_TAB_BG: primary.p050,

  // INPUTS
  INCORRECT_INPUT_BG: primary.p200,
  INPUT_BG: grey.g075,

  // BUTTONS
  BUTTON_P: primary.p500,
  BUTTON_P_HIGHLIGHT: primary.p500,
  BUTTON_T: grey.g999,
  BUTTON_T_HIGHLIGHT: grey.g900,

  // TEXT COLOURS
  TEXT_P: primary.p500,
  TEXT_HIGHLIGHT: secondary.s500,

  // TEXT GREY
  TEXT_L: grey.g400,
  TEXT_M: grey.g700,
  TEXT: grey.g800,
  TEXT_DARK: grey.g999,

  COMPLETE_CELL: yellow.y500,
  COMPLETE_CELL_SHADOW: yellow.y300,
  INCOMPLETE_CELL: grey.g100,
};
