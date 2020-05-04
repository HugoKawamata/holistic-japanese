// @flow
import * as React from "react";
import { View, StyleSheet, Image } from "react-native";
import type { LessonContent } from "../../Learn/__generated__/NextLesson";
import type { Results } from "../../Lesson/types";
import FuriganaText from "../../../components/Text/FuriganaText";
import Text from "../../../components/Text";
import Button from "../../../components/Button";
import { fontSize } from "../../../util/font";
import color from "../../../util/color";

export const kanaLevelToIntMap = {
  // null is considered the 0th element here
  "HIRAGANA-A": 1,
  "HIRAGANA-KA": 2,
  "HIRAGANA-GA": 3,
  "HIRAGANA-SA": 4,
  "HIRAGANA-ZA": 5,
  "HIRAGANA-TA": 6,
  "HIRAGANA-DA": 7,
  "HIRAGANA-NA": 8,
  "HIRAGANA-N": 9,
  "HIRAGANA-HA": 10,
  "HIRAGANA-BA": 11,
  "HIRAGANA-MA": 12,
  "HIRAGANA-WA": 13,
  "HIRAGANA-YA": 14,
  "HIRAGANA-LYA": 15,
  "HIRAGANA-RA": 16,
  "HIRAGANA-PA": 17,

  "KATAKANA-A": 18,
  "KATAKANA-KA": 19,
  "KATAKANA-GA": 20,
  "KATAKANA-SA": 21,
  "KATAKANA-ZA": 22,
  "KATAKANA-TA": 23,
  "KATAKANA-DA": 24,
  "KATAKANA-NA": 25,
  "KATAKANA-N": 26,
  "KATAKANA-HA": 27,
  "KATAKANA-BA": 28,
  "KATAKANA-MA": 29,
  "KATAKANA-WA": 30,
  "KATAKANA-YA": 31,
  "KATAKANA-LYA": 32,
  "KATAKANA-RA": 33,
  "KATAKANA-PA": 34,
};

export const columnLeadToKanaLevelMap = {
  あ: 1,
  か: 2,
  が: 3,
  さ: 4,
  ざ: 5,
  た: 6,
  だ: 7,
  な: 8,
  ん: 9,
  は: 10,
  ば: 11,
  ま: 12,
  わ: 13,
  や: 14,
  きゃ: 15,
  ぎゃ: 15,
  しゃ: 15,
  じゃ: 15,
  ちゃ: 15,
  にゃ: 15,
  ひゃ: 15,
  びゃ: 15,
  ぴゃ: 15,
  みゃ: 15,
  りゃ: 15,
  ら: 16,
  ぱ: 17,
};

export const hiraganaMatrix = [
  ["-", "あ", "い", "う", "え", "お"],
  ["K", "か", "き", "く", "け", "こ"],
  ["S", "さ", "し", "す", "せ", "そ"],
  ["T", "た", "ち", "つ", "て", "と"],
  ["N", "な", "に", "ぬ", "ね", "の"],
  ["H", "は", "ひ", "ふ", "へ", "ほ"],
  ["M", "ま", "み", "む", "め", "も"],
  ["Y", "や", "", "ゆ", "", "よ"],
  ["R", "ら", "り", "る", "れ", "ろ"],
  ["W", "わ", "", "", "", "を"],
  ["N", "ん"],
];

export const hiraganaRomajiMatrix = [
  ["a", "i", "u", "e", "o"],
  ["ka", "ki", "ku", "ke", "ko"],
  ["sa", "shi", "su", "se", "so"],
  ["ta", "chi", "tsu", "te", "to"],
  ["na", "ni", "nu", "ne", "no"],
  ["ha", "hi", "fu", "he", "ho"],
  ["ma", "mi", "mu", "me", "mo"],
  ["ya", "", "yu", "", "yo"],
  ["ra", "ri", "ru", "re", "ro"],
  ["wa", "", "", "", "wo"],
  ["n"],
];

export const voicedHiraganaMatrix = [
  ["-", "", "", "", "", ""],
  ["G", "が", "ぎ", "ぐ", "げ", "ご"],
  ["Z", "ざ", "じ", "ず", "ぜ", "ぞ"],
  ["D", "だ", "ぢ", "づ", "で", "ど"],
  ["N", "", "", "", "", ""],
  ["B", "ば", "び", "ぶ", "べ", "ぼ"],
  ["P", "ぱ", "ぴ", "ぷ", "ぺ", "ぽ"],
  ["M", "", "", "", "", ""],
  ["Y", "", "", "", "", ""],
  ["R", "", "", "", "", ""],
  ["W", "", "", "", "", ""],
  ["N", "", "", "", "", ""],
];

export const voicedHiraganaRomajiMatrix = [
  ["", "", "", "", ""],
  ["ga", "gi", "gu", "ge", "go"],
  ["za", "ji", "zu", "ze", "zo"],
  ["da", "dzi", "dzu", "de", "do"],
  ["", "", "", "", ""],
  ["ba", "bi", "bu", "be", "bo"],
  ["pa", "pi", "pu", "pe", "po"],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const comboMatrix = [
  ["K", "きゃ", "", "きゅ", "", "きょ"],
  ["G", "ぎゃ", "", "ぎゅ", "", "ぎょ"],
  ["Sh", "しゃ", "", "しゅ", "", "しょ"],
  ["J", "じゃ", "", "じゅ", "", "じょ"],
  ["Ch", "ちゃ", "", "ちゅ", "", "ちょ"],
  ["N", "にゃ", "", "にゅ", "", "にょ"],
  ["H", "ひゃ", "", "ひゅ", "", "ひょ"],
  ["B", "びゃ", "", "びゅ", "", "びょ"],
  ["P", "ぴゃ", "", "ぴゅ", "", "ぴょ"],
  ["M", "みゃ", "", "みゅ", "", "みょ"],
  ["R", "りゃ", "", "りゅ", "", "りょ"],
];

export const comboRomajiMatrix = [
  ["kya", "", "kyu", "", "kyo"],
  ["gya", "", "gyu", "", "gyo"],
  ["sha", "", "shu", "", "sho"],
  ["ja", "", "ju", "", "jo"],
  ["cha", "", "chu", "", "cho"],
  ["nya", "", "nyu", "", "nyo"],
  ["hya", "", "hyu", "", "hyo"],
  ["bya", "", "byu", "", "byo"],
  ["pya", "", "pyu", "", "pyo"],
  ["mya", "", "myu", "", "myo"],
  ["rya", "", "ryu", "", "ryo"],
];

const styles = StyleSheet.create({
  body: {},
  bodyTextSymbol: {
    fontSize: fontSize.kanaAsImage,
    textAlign: "center",
  },
  bodyTextLarge: {
    fontSize: fontSize.large,
    textAlign: "center",
  },
  bodyTextRegular: {
    color: color.TEXT_M,
    fontSize: fontSize.regular,
    textAlign: "center",
  },
  bottomSection: {
    alignItems: "center",
  },
  buttonEnglish: {},
  buttonJapanese: {},
  character: {
    textAlign: "center",
  },
  characterResultContainer: {
    padding: 4,
  },
  characterResult: {
    textAlign: "center",
  },
  characterResults: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 30,
  },
  word: {
    textAlign: "center",
  },
  wordResultContainer: {
    paddingHorizontal: 6,
    paddingTop: 6,
  },
  wordResult: {
    textAlign: "center",
  },
  wordResults: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 30,
  },
  image: {
    height: 100,
    width: 100,
  },
  imageWrapper: {},
  modalTitle: {},
  topSection: {
    alignContent: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
});

type ContentProps = {
  results: Results,
  closeModal: any,
  children: React.Node,
};

function CompletedModalContent(props: ContentProps) {
  return (
    <>
      <View style={styles.topSection}>
        <View style={styles.body}>
          <Text style={styles.bodyTextLarge}>Character results</Text>
          <View style={styles.characterResults}>
            {Object.keys(props.results)
              .filter((key) => props.results[key].objectType === "CHARACTER")
              .map((key) => {
                const accuracy =
                  100 *
                  (props.results[key].marks.filter((m) => m === "CORRECT")
                    .length /
                    props.results[key].marks.length);
                return (
                  <View style={styles.characterResultContainer}>
                    <Text style={styles.character}>{key.slice(5)}</Text>
                    <Text style={styles.characterResult}>{`${accuracy}%`}</Text>
                  </View>
                );
              })}
          </View>
          <Text style={styles.bodyTextLarge}>Word results</Text>
          <View style={styles.wordResults}>
            {Object.keys(props.results)
              .filter((key) => props.results[key].objectType === "WORD")
              .map((key) => {
                const accuracy =
                  100 *
                  (props.results[key].marks.filter((m) => m === "CORRECT")
                    .length /
                    props.results[key].marks.length);
                return (
                  <View style={styles.wordResultContainer}>
                    <Text style={styles.word}>{key}</Text>
                    <Text style={styles.wordResult}>{`${accuracy}%`}</Text>
                  </View>
                );
              })}
          </View>
          {props.children}
        </View>
      </View>
      <View style={styles.bottomSection}>
        <Button theme="success" onPress={props.closeModal}>
          <Text style={styles.buttonJapanese}>いいね！</Text>
          <Text style={styles.buttonEnglish}>Cool!</Text>
        </Button>
      </View>
    </>
  );
}

export const getModalContent = (
  completedContent: ?LessonContent,
  results: Results,
  closeModal: any
) => {
  switch (completedContent) {
    case "HIRAGANA_A":
      return (
        <CompletedModalContent results={results} closeModal={closeModal}>
          <Text style={styles.bodyTextLarge}>あ Hiragana Line Complete!</Text>
          <Text style={styles.bodyTextRegular}>1/10 Lines Complete</Text>
        </CompletedModalContent>
      );
    case "HIRAGANA_KA":
      return (
        <CompletedModalContent results={results} closeModal={closeModal}>
          <Text style={styles.bodyTextLarge}>か Hiragana Line Complete!</Text>
          <Text style={styles.bodyTextRegular}>2/10 Lines Complete</Text>
        </CompletedModalContent>
      );
    case "HIRAGANA_GA":
      return (
        <CompletedModalContent results={results} closeModal={closeModal}>
          <Text style={styles.bodyTextLarge}>が Hiragana Line Complete!</Text>
          <Text style={styles.bodyTextRegular}>
            1/10 Bonus Lessons Complete
          </Text>
        </CompletedModalContent>
      );
    case "HIRAGANA_SA":
      return (
        <CompletedModalContent results={results} closeModal={closeModal}>
          <Text style={styles.bodyTextLarge}>さ Hiragana Line Complete!</Text>
          <Text style={styles.bodyTextRegular}>3/10 Lines Complete</Text>
        </CompletedModalContent>
      );
    case "HIRAGANA_ZA":
      return (
        <CompletedModalContent results={results} closeModal={closeModal}>
          <Text style={styles.bodyTextLarge}>ざ Hiragana Line Complete!</Text>
          <Text style={styles.bodyTextRegular}>
            2/10 Bonus Lessons Complete
          </Text>
        </CompletedModalContent>
      );
    case "HIRAGANA_TA":
      return (
        <CompletedModalContent results={results} closeModal={closeModal}>
          <Text style={styles.bodyTextLarge}>た Hiragana Line Complete!</Text>
          <Text style={styles.bodyTextRegular}>4/10 Lines Complete</Text>
        </CompletedModalContent>
      );
    default:
      return null;
  }
};

const aCompletedModalTitle = (
  <Text style={styles.modalTitle}>Congratulations!</Text>
);

export const getModalTitle = (completedContent: LessonContent) => {
  switch (completedContent) {
    case "HIRAGANA_A":
      return aCompletedModalTitle;
    default:
      return null;
  }
};
