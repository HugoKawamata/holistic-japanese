// @flow

// const furigana = "わたしのこうざをはじめる"
// const text = "私の講座を始める"
const notKanji = [
  "ぁ",
  "あ",
  "ぃ",
  "い",
  "ぅ",
  "う",
  "ぇ",
  "え",
  "ぉ",
  "お",
  "か",
  "が",
  "き",
  "ぎ",
  "く",
  "ぐ",
  "け",
  "げ",
  "こ",
  "ご",
  "さ",
  "ざ",
  "し",
  "じ",
  "す",
  "ず",
  "せ",
  "ぜ",
  "そ",
  "ぞ",
  "た",
  "だ",
  "ち",
  "ぢ",
  "っ",
  "つ",
  "づ",
  "て",
  "で",
  "と",
  "ど",
  "な",
  "に",
  "ぬ",
  "ね",
  "の",
  "は",
  "ば",
  "ぱ",
  "ひ",
  "び",
  "ぴ",
  "ふ",
  "ぶ",
  "ぷ",
  "へ",
  "べ",
  "ぺ",
  "ほ",
  "ぼ",
  "ぽ",
  "ま",
  "み",
  "む",
  "め",
  "も",
  "ゃ",
  "や",
  "ゅ",
  "ゆ",
  "ょ",
  "よ",
  "ら",
  "り",
  "る",
  "れ",
  "ろ",
  "ゎ",
  "わ",
  "ゐ",
  "ゑ",
  "を",
  "ん",
  "ゔ",
  "ゕ",
  "ゖ",
  "ァ",
  "ア",
  "ィ",
  "イ",
  "ゥ",
  "ウ",
  "ェ",
  "エ",
  "ォ",
  "オ",
  "カ",
  "ガ",
  "キ",
  "ギ",
  "ク",
  "グ",
  "ケ",
  "ゲ",
  "コ",
  "ゴ",
  "サ",
  "ザ",
  "シ",
  "ジ",
  "ス",
  "ズ",
  "セ",
  "ゼ",
  "ソ",
  "ゾ",
  "タ",
  "ダ",
  "チ",
  "ヂ",
  "ッ",
  "ツ",
  "ヅ",
  "テ",
  "デ",
  "ト",
  "ド",
  "ナ",
  "ニ",
  "ヌ",
  "ネ",
  "ノ",
  "ハ",
  "バ",
  "パ",
  "ヒ",
  "ビ",
  "ピ",
  "フ",
  "ブ",
  "プ",
  "ヘ",
  "ベ",
  "ペ",
  "ホ",
  "ボ",
  "ポ",
  "マ",
  "ミ",
  "ム",
  "メ",
  "モ",
  "ャ",
  "ヤ",
  "ュ",
  "ユ",
  "ョ",
  "ヨ",
  "ラ",
  "リ",
  "ル",
  "レ",
  "ロ",
  "ヮ",
  "ワ",
  "ヰ",
  "ヱ",
  "ヲ",
  "ン",
  "ヴ",
  "ヵ",
  "ヶ",
  "ヷ",
  "ヸ",
  "ヹ",
  "ヺ",
  "・",
  "ー",
  "ヽ",
  "ヾ",
];

const generateArray = (
  kana: string,
  text: string,
  pairs: Array<FuriganaPair>,
  currentPair: FuriganaPair
) => {
  console.log(kana, text, pairs, currentPair);
  if (text.length === 0 && kana.length === 0) {
    return [...pairs, currentPair];
  }
  let newCurrentPair = currentPair;

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
    } else {
      // Keep going adding chars to current pair
      newCurrentPair.furigana += kana[0];
      newCurrentPair.text += text[0];
      return generateArray(kana.slice(1), text.slice(1), pairs, newCurrentPair);
    }
  } else {
    // The current pairs do not match, so we're currently assigning furigana to kanji
    if (notKanji.includes(text[0])) {
      // Next char in text is not kanji, so the kanji block is over
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
    } else {
      // Next char in text is still kanji
      newCurrentPair.text += text[0];
      return generateArray(kana, text.slice(1), pairs, newCurrentPair);
    }
  }
};

export const startGenerateArray = (kana: string, text: string) => {
  console.log(kana, text);
  return generateArray(kana.slice(1), text.slice(1), [], {
    furigana: kana[0],
    text: text[0],
  });
};
