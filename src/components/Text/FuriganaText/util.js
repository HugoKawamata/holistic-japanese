/* @flow */
import { notKanji, highlightersOpen, highlightersClosed } from "../util";

type FuriganaPair = {|
  furigana: string,
  text: string,
|};

// Recursively adds pairs of kana and kanji to `pairs`
const generateArray = (
  kana: string,
  text: string,
  pairs: Array<FuriganaPair>,
  currentPair: FuriganaPair
) => {
  if (text.length === 0 && kana.length === 0) {
    return [...pairs, currentPair];
  }
  const newCurrentPair = currentPair;

  if (highlightersOpen.includes(newCurrentPair.text[0])) {
    // Next char is closing the highlight for both text and kana
    if (highlightersClosed.includes(text[0])) {
      if (text[0] === kana[0]) {
        newCurrentPair.text += text[0];
        newCurrentPair.furigana += kana[0];
        return generateArray(
          kana.slice(2),
          text.slice(2),
          [...pairs, newCurrentPair],
          // It's possible we overshoot here, since we dont know two chars ahead
          // so we default to empty string
          { furigana: kana[1] || "", text: text[1] || "" }
        );
      }
      // Next char closes text highlight, but there are still more kana
      newCurrentPair.furigana += kana[0];
      return generateArray(kana.slice(1), text, pairs, newCurrentPair);
    }
    // Next char doesn't close text highlight. Keep adding to text.
    newCurrentPair.text += text[0];
    return generateArray(kana, text.slice(1), pairs, newCurrentPair);
  }

  if (newCurrentPair.furigana === newCurrentPair.text) {
    // Check if next char is different
    // Current pairs match, so we're getting through a stretch of kana
    if (text[0] !== kana[0]) {
      // Next letter of text different to next letter of kana, abort and start new pair
      return generateArray(
        kana.slice(1),
        text.slice(1),
        [...pairs, newCurrentPair],
        { furigana: kana[0], text: text[0] }
      );
    }
    // Keep going adding chars to current pair
    newCurrentPair.furigana += kana[0];
    newCurrentPair.text += text[0];
    return generateArray(kana.slice(1), text.slice(1), pairs, newCurrentPair);
  }
  // The current pairs do not match, so we're currently assigning furigana to kanji
  if (notKanji.includes(text[0]) || text.length === 0) {
    // Next char in text is not kanji, so the kanji block is over
    // OR final char in text was kanji, so the kanji block is over
    if (text[0] === kana[0]) {
      // Next letter matches, so we're done assigning furigana
      return generateArray(
        kana.slice(1),
        text.slice(1),
        [...pairs, newCurrentPair],
        { furigana: kana[0], text: text[0] }
      );
    }
    // Keep assigning kana to this kanji
    newCurrentPair.furigana += kana[0];
    return generateArray(kana.slice(1), text, pairs, newCurrentPair);
  }
  // Next char in text is still kanji
  newCurrentPair.text += text[0];
  return generateArray(kana, text.slice(1), pairs, newCurrentPair);
};

export const startGenerateArray = (
  kana: string,
  text: string
): Array<FuriganaPair> => {
  return generateArray(kana.slice(1), text.slice(1), [], {
    furigana: kana[0],
    text: text[0],
  });
};
