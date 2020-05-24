/* @flow */
import * as React from "react";
import { View, StyleSheet } from "react-native";
import type { AvailableLessons_user_availableCourses_availableLessons_testables as Testable } from "../../Learn/__generated__/AvailableLessons";
import type { Results } from "../../Lesson/types";
import Text from "../../../components/Text";
import Button from "../../../components/Button";
import { fontSize } from "../../../util/font";
import color from "../../../util/color";

export const kanaLevelToIntMap = {
  // null is considered the 0th element here
  HIRAGANA_A: 1,
  HIRAGANA_KA: 2,
  HIRAGANA_GA: 3,
  HIRAGANA_SA: 4,
  HIRAGANA_ZA: 5,
  HIRAGANA_TA: 6,
  HIRAGANA_DA: 7,
  HIRAGANA_NA: 8,
  HIRAGANA_N: 9,
  HIRAGANA_HA: 10,
  HIRAGANA_BA: 11,
  HIRAGANA_MA: 12,
  HIRAGANA_WA: 13,
  HIRAGANA_YA: 14,
  HIRAGANA_LYA: 15,
  HIRAGANA_RA: 16,
  HIRAGANA_PA: 17,

  KATAKANA_A: 18,
  KATAKANA_KA: 19,
  KATAKANA_GA: 20,
  KATAKANA_SA: 21,
  KATAKANA_ZA: 22,
  KATAKANA_TA: 23,
  KATAKANA_DA: 24,
  KATAKANA_NA: 25,
  KATAKANA_N: 26,
  KATAKANA_HA: 27,
  KATAKANA_BA: 28,
  KATAKANA_MA: 29,
  KATAKANA_WA: 30,
  KATAKANA_YA: 31,
  KATAKANA_LYA: 32,
  KATAKANA_RA: 33,
  KATAKANA_PA: 34,
};

export const columnLeadToKanaLevelMap = {
  あ: "HIRAGANA_A",
  か: "HIRAGANA_KA",
  が: "HIRAGANA_GA",
  さ: "HIRAGANA_SA",
  ざ: "HIRAGANA_ZA",
  た: "HIRAGANA_TA",
  だ: "HIRAGANA_DA",
  な: "HIRAGANA_NA",
  ん: "HIRAGANA_N",
  は: "HIRAGANA_HA",
  ば: "HIRAGANA_BA",
  ま: "HIRAGANA_MA",
  わ: "HIRAGANA_WA",
  や: "HIRAGANA_YA",
  きゃ: "HIRAGANA_LYA",
  ぎゃ: "HIRAGANA_LYA",
  しゃ: "HIRAGANA_LYA",
  じゃ: "HIRAGANA_LYA",
  ちゃ: "HIRAGANA_LYA",
  にゃ: "HIRAGANA_LYA",
  ひゃ: "HIRAGANA_LYA",
  びゃ: "HIRAGANA_LYA",
  ぴゃ: "HIRAGANA_LYA",
  みゃ: "HIRAGANA_LYA",
  りゃ: "HIRAGANA_LYA",
  ら: "HIRAGANA_RA",
  ぱ: "HIRAGANA_PA",
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
  // ["N", "", "", "", "", ""],
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
  // ["", "", "", "", ""],
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
  buttonEnglish: {
    color: color.WHITE,
  },
  buttonJapanese: {
    color: color.WHITE,
  },
  leftCol: {
    flexDirection: "row",
  },
  emoji: {
    marginTop: -4,
    paddingRight: 14,
  },
  word: {
    textAlign: "center",
    marginBottom: -4,
  },
  wordResultContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 6,
    paddingTop: 6,
  },
  wordResult: {
    flexGrow: 1,
    textAlign: "right",
  },
  wordResults: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
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
  closeModal: () => typeof undefined,
  children: React.Node,
  results: Results,
  testables: $ReadOnlyArray<Testable>,
};

function CompletedModalContent(props: ContentProps) {
  const { results, testables, children, closeModal } = props;
  return (
    <>
      <View style={styles.topSection}>
        <View style={styles.body}>
          <Text style={styles.bodyTextLarge}>Results</Text>
          <View style={styles.wordResults}>
            {Object.keys(results)
              .filter((key) => props.results[key].objectType === "WORD")
              .map((key) => {
                const accuracy =
                  100 *
                  (props.results[key].marks.filter((m) => m === "CORRECT")
                    .length /
                    props.results[key].marks.length);
                return (
                  <View key={key} style={styles.wordResultContainer}>
                    <View style={styles.leftCol}>
                      <Text style={styles.emoji}>
                        {testables.find((t) => t.question.text === key)
                          ?.question.emoji || ""}
                      </Text>
                      <Text style={styles.word}>{key}</Text>
                    </View>
                    <Text style={styles.wordResult}>{`${accuracy}%`}</Text>
                  </View>
                );
              })}
          </View>
          {children}
        </View>
      </View>
      <View style={styles.bottomSection}>
        <Button theme="primary" onPress={closeModal}>
          <Text style={styles.buttonJapanese}>いいね！</Text>
          <Text style={styles.buttonEnglish}>Cool!</Text>
        </Button>
      </View>
    </>
  );
}

export const getModalContent = (
  completedContent: ?string,
  results: Results,
  testables: $ReadOnlyArray<Testable>,
  closeModal: () => typeof undefined
) => {
  switch (completedContent) {
    case "HIRAGANA_A":
      return (
        <CompletedModalContent
          results={results}
          closeModal={closeModal}
          testables={testables}
        >
          <Text style={styles.bodyTextLarge}>あ Hiragana Line Complete!</Text>
          <Text style={styles.bodyTextRegular}>1/10 Lines Complete</Text>
        </CompletedModalContent>
      );
    case "HIRAGANA_KA":
      return (
        <CompletedModalContent
          results={results}
          closeModal={closeModal}
          testables={testables}
        >
          <Text style={styles.bodyTextLarge}>か Hiragana Line Complete!</Text>
          <Text style={styles.bodyTextRegular}>2/10 Lines Complete</Text>
        </CompletedModalContent>
      );
    case "HIRAGANA_GA":
      return (
        <CompletedModalContent
          results={results}
          closeModal={closeModal}
          testables={testables}
        >
          <Text style={styles.bodyTextLarge}>が Hiragana Line Complete!</Text>
          <Text style={styles.bodyTextRegular}>
            1/10 Bonus Lessons Complete
          </Text>
        </CompletedModalContent>
      );
    case "HIRAGANA_SA":
      return (
        <CompletedModalContent
          results={results}
          closeModal={closeModal}
          testables={testables}
        >
          <Text style={styles.bodyTextLarge}>さ Hiragana Line Complete!</Text>
          <Text style={styles.bodyTextRegular}>3/10 Lines Complete</Text>
        </CompletedModalContent>
      );
    case "HIRAGANA_ZA":
      return (
        <CompletedModalContent
          results={results}
          closeModal={closeModal}
          testables={testables}
        >
          <Text style={styles.bodyTextLarge}>ざ Hiragana Line Complete!</Text>
          <Text style={styles.bodyTextRegular}>
            2/10 Bonus Lessons Complete
          </Text>
        </CompletedModalContent>
      );
    case "HIRAGANA_TA":
      return (
        <CompletedModalContent
          results={results}
          closeModal={closeModal}
          testables={testables}
        >
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

export const getModalTitle = (completedContent: string) => {
  switch (completedContent) {
    case "HIRAGANA_A":
      return aCompletedModalTitle;
    default:
      return null;
  }
};
