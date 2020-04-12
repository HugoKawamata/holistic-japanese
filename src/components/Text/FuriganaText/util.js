// @flow

const generateArray = (
  kana: string,
  text: string,
  pairs: Array<FuriganaPair>,
  currentPair: FuriganaPair
) => {
  if (text.length === 0 && kana.lengthh === 0) {
    return pairs;
  }
  let newCurrentPair = currentPair;

  if (newCurrentPair.furigana === newCurrentPair.text) {
    // Check if next char is different
    // Current pairs match, so we're getting through a stretch of kana
    if (text[0] !== kana[0]) {
      // Next letter of text different to next letter of kana, abort and start new pair
      newCurrentPair.furigana = null;
      return generateArray(
        kana.slice(1),
        text.slice(1),
        [...pairs, newCurrentPair],
        { furigana: kana[0], text: text[0] }
      );
    } else {
      // Keep going adding chars to current pair
      newCurrentPair.furigana += kana[0];
      newCurrentPair.text += text[0];
      return generateArray(kana.slice(1), text.slice(1), pairs, newCurrentPair);
    }
  } else {
    // The current pairs do not match, so we're currently assigning furigana to kanji
    if (text[0] === kana[0]) {
      // Next letter matches, so we're done assigning furigana
      return generateArray(
        kana.slice(1),
        text.slice(1),
        [...pairs, newCurrentPair],
        { furigana: kana[0], text: text[0] }
      );
    } else {
      // Keep assigning kana to this kanji
      newCurrentPair.furigana += kana[0];
      return generateArray(kana.slice(1), text, pairs, newCurrentPair);
    }
  }
};

const startGenerateArray = (kana: string, text: string) => {
  generateArray(kana.slice(1), text.slice(1), [], {
    furigana: kana[0],
    text: text[0],
  });
};
