/* @flow */

export const addSplotsToText = (text: string, splots: Splots) => {
  let formatted = text;
  if (splots.me != null) {
    formatted = formatted.replace(/\{me\}/g, splots.me);
  }
  if (splots.meFuri != null) {
    formatted = formatted.replace(/\{me_furi\}/g, splots.meFuri);
  }
  if (splots.fname != null) {
    formatted = formatted.replace(/\{fname\}/g, splots.fname);
  }
  return formatted;
};

export default {
  addSplotsToText,
};
