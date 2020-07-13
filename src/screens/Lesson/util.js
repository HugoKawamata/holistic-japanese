/* @flow */
import type { AvailableLessons_me_availableCourses_availableLessons_testables as Testable } from "../Learn/__generated__/AvailableLessons";
import type { Results, Result, UserAnswer } from "./types";

export const possibleSokuon = ["k", "g", "s", "z", "t", "d", "h", "b", "p"];

export const romajiHiraganaMap = {
  a: "あ",
  i: "い",
  u: "う",
  e: "え",
  o: "お",
  ka: "か",
  ki: "き",
  ku: "く",
  ke: "け",
  ko: "こ",
  ga: "が",
  gi: "ぎ",
  gu: "ぐ",
  ge: "げ",
  go: "ご",
  sa: "さ",
  shi: "し",
  su: "す",
  se: "せ",
  so: "そ",
  za: "ざ",
  ji: "じ",
  zu: "ず",
  ze: "ぜ",
  zo: "ぞ",
  ta: "た",
  chi: "ち",
  tsu: "つ",
  te: "て",
  to: "と",
  da: "だ",
  dji: "ぢ",
  dzu: "づ",
  de: "で",
  do: "ど",
  na: "な",
  ni: "に",
  nu: "ぬ",
  ne: "ね",
  no: "の",
  ha: "は",
  hi: "ひ",
  fu: "ふ",
  he: "へ",
  ho: "ほ",
  ba: "ば",
  bi: "び",
  bu: "ぶ",
  be: "べ",
  bo: "ぼ",
  pa: "ぱ",
  pi: "ぴ",
  pu: "ぷ",
  pe: "ぺ",
  po: "ぽ",
  ma: "ま",
  mi: "み",
  mu: "む",
  me: "め",
  mo: "も",
  ya: "や",
  yu: "ゆ",
  yo: "よ",
  ra: "ら",
  ri: "り",
  ru: "る",
  re: "れ",
  ro: "ろ",
  wa: "わ",
  wo: "を",
  n: "ん",
  kya: "きゃ",
  kyu: "きゅ",
  kyo: "きょ",
  gya: "ぎゃ",
  gyu: "ぎゅ",
  gyo: "ぎょ",
  sha: "しゃ",
  shu: "しゅ",
  sho: "しょ",
  ja: "じゃ",
  ju: "じゅ",
  jo: "じょ",
  cha: "ちゃ",
  chu: "ちゅ",
  cho: "ちょ",
  nya: "にゃ",
  nyu: "にゅ",
  nyo: "にょ",
  hya: "ひゃ",
  hyu: "ひゅ",
  hyo: "ひょ",
  bya: "びゃ",
  byu: "びゅ",
  byo: "びょ",
  pya: "ぴゃ",
  pyu: "ぴゅ",
  pyo: "ぴょ",
  mya: "みゃ",
  myu: "みゅ",
  myo: "みょ",
  rya: "りゃ",
  ryu: "りゅ",
  ryo: "りょ",
};

export const hiraganaRomajiMap = {
  あ: "a",
  い: "i",
  う: "u",
  え: "e",
  お: "o",
  か: "ka",
  き: "ki",
  く: "ku",
  け: "ke",
  こ: "ko",
  が: "ga",
  ぎ: "gi",
  ぐ: "gu",
  げ: "ge",
  ご: "go",
  さ: "sa",
  し: "shi",
  す: "su",
  せ: "se",
  そ: "so",
  ざ: "za",
  じ: "ji",
  ず: "zu",
  ぜ: "ze",
  ぞ: "zo",
  た: "ta",
  ち: "chi",
  つ: "tsu",
  て: "te",
  と: "to",
  だ: "da",
  ぢ: "dji",
  づ: "dzu",
  で: "de",
  ど: "do",
  な: "na",
  に: "ni",
  ぬ: "nu",
  ね: "ne",
  の: "no",
  は: "ha",
  ひ: "hi",
  ふ: "fu",
  へ: "he",
  ほ: "ho",
  ば: "ba",
  び: "bi",
  ぶ: "bu",
  べ: "be",
  ぼ: "bo",
  ぱ: "pa",
  ぴ: "pi",
  ぷ: "pu",
  ぺ: "pe",
  ぽ: "po",
  ま: "ma",
  み: "mi",
  む: "mu",
  め: "me",
  も: "mo",
  や: "ya",
  ゆ: "yu",
  よ: "yo",
  ら: "ra",
  り: "ri",
  る: "ru",
  れ: "re",
  ろ: "ro",
  わ: "wa",
  を: "wo",
  ん: "n",
  きゃ: "kya",
  きゅ: "kyu",
  きょ: "kyo",
  ぎゃ: "gya",
  ぎゅ: "gyu",
  ぎょ: "gyo",
  しゃ: "sha",
  しゅ: "shu",
  しょ: "sho",
  じゃ: "ja",
  じゅ: "ju",
  じょ: "jo",
  ちゃ: "cha",
  ちゅ: "chu",
  ちょ: "cho",
  にゃ: "nya",
  にゅ: "nyu",
  にょ: "nyo",
  ひゃ: "hya",
  ひゅ: "hyu",
  ひょ: "hyo",
  びゃ: "bya",
  びゅ: "byu",
  びょ: "byo",
  ぴゃ: "pya",
  ぴゅ: "pyu",
  ぴょ: "pyo",
  みゃ: "mya",
  みゅ: "myu",
  みょ: "myo",
  りゃ: "rya",
  りゅ: "ryu",
  りょ: "ryo",
  っ: "ltsu",
};

// This is so that if the user types "n" for anything other than "ん", it doesn't
// move the ref to the next text input field
export const nChecker = (lowerText: string, charRomaji: string) => {
  return (lowerText === "n" && charRomaji === "n") || lowerText !== "n";
};

export const getKeyForTestable = (testable: Testable): string => {
  if (testable.objectType === "TESTABLE") {
    return `testable-${testable.objectId}`;
  }
  if (testable.objectType === "WORD") {
    return testable.question.text;
  }
  return testable.objectId;
};

export const formatResultsForMutation = (results: Results): Array<Result> =>
  Object.keys(results)
    .map((charKey: string) => results[charKey])
    .filter((res) => res.answers.length > 0);

// Stage 0 (show emoji and introduction)
// Stage 1 (show emoji)
// Stage 2 (show no hints)
// Revision words skip stage 1
export const getQuestionStage = (
  currentTestable: Testable,
  results: Results
) => {
  let questionStage = results[getKeyForTestable(currentTestable)].marks.filter(
    (m) => m === "CORRECT"
  ).length;

  // Revision words skip stage 1
  if (currentTestable.introduction == null) {
    questionStage += 1;
  }
  return questionStage;
};

export const getSplitQuestion = (currentTestable: Testable) => {
  if (currentTestable.question.type !== "KANA_WORD") {
    throw new Error("Cannot split a question if it's not a Japanese word");
  }

  let unbrokenQuestion = currentTestable.question.text;
  let splitQuestion = [];

  // We have to go backwards due to lya/lyu/lyo
  while (unbrokenQuestion.length > 0) {
    let current = unbrokenQuestion[unbrokenQuestion.length - 1];
    unbrokenQuestion = unbrokenQuestion.slice(0, unbrokenQuestion.length - 1);
    if (Object.keys(hiraganaRomajiMap).includes(current)) {
      splitQuestion = [current, ...splitQuestion];
    } else {
      current = `${unbrokenQuestion[unbrokenQuestion.length - 1]}${current}`;
      splitQuestion = [current, ...splitQuestion];
    }
  }
  return splitQuestion;
};

export const getCSVAnswer = (userAnswer: UserAnswer) => {
  const userInputs = Object.entries(userAnswer)
    .sort()
    .map((kvPair) => kvPair[1]); // Just get the values out (the user inputs)
  return userInputs.length === 0
    ? ""
    : userInputs.reduce(
        // $FlowFixMe userInput is always a string
        (acc: string, userInput: mixed) => `${acc},${userInput}`
      );
};
