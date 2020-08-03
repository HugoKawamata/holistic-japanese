/* @flow */
import * as React from "react";
import { View, Image } from "react-native";
import Sound from "react-native-sound";
import OverlayModal from "../../../components/OverlayModal";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import type { AvailableLessons_me_availableCourses_availableLessons_testables as Testable } from "../../Learn/__generated__/AvailableLessons";
import type { UserAnswer, Results } from "../types";
import {
  getSplitQuestion,
  hiraganaRomajiMap,
  getCSVAnswer,
  getKeyForTestable,
} from "../util";
import type { LecturesStatus } from "..";
import { sharedStyles } from "../styles";
import AnswerButton from "../AnswerButton";
import {
  getTopSectionContent,
  getAnswerSection,
  getHint,
} from "./sectionRenderers";
import styles from "./styles";

type Props = {|
  children: React.Node, // Children is always the answer field node
  currentMark: ?("CORRECT" | "INCORRECT"),
  currentTestable: Testable,
  goToNextQuestion: (?("CORRECT" | "INCORRECT")) => void,
  lecturesStatus: LecturesStatus,
  setExitModalVisible: (boolean) => void,
  questionStage: number,
  results: Results,
  setCurrentMark: ("CORRECT" | "INCORRECT" | null | typeof undefined) => void,
  setLecturesStatus: (LecturesStatus) => typeof undefined,
  setResults: (Results) => void,
  userAnswer: UserAnswer,
|};

export function WordLesson(props: Props) {
  const {
    children,
    currentMark,
    currentTestable,
    goToNextQuestion,
    lecturesStatus,
    setExitModalVisible,
    setLecturesStatus,
    questionStage,
    results,
    userAnswer,
  } = props;

  const isFirstTestableEver =
    currentTestable.question.text === "いえ" &&
    results[currentTestable.question.text].marks.length === 0 &&
    Object.keys(results).length === 4; // 1 for each word in lesson HIRAGANA_A

  const [helpModalVisible, setHelpModalVisible] = React.useState(
    isFirstTestableEver
  );

  const answerRomajiQuestion = () => {
    const csvAnswer = getCSVAnswer(userAnswer);
    const splitAnswer = csvAnswer.split(",");

    let mark;
    if (csvAnswer === currentTestable.answer.text) {
      // Answer is correct!
      props.setCurrentMark("CORRECT");
      mark = "CORRECT";
    } else {
      // Answer is incorrect!
      props.setCurrentMark("INCORRECT");
      mark = "INCORRECT";
    }

    const soundFile = `word_${currentTestable.answer.text.replace(
      /,/g,
      ""
    )}.mp3`;
    const charSound = new Sound(soundFile, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        // do something
      }
      // play when loaded
      charSound.play();
    });
    charSound.release();

    let characterResults = {};
    if (currentTestable.question.type === "KANA_WORD") {
      const splitQuestion = getSplitQuestion(currentTestable);
      characterResults = splitQuestion.reduce(
        (resultsMap, char: string, index: number) => {
          return {
            ...resultsMap,
            [`char-${char}`]: {
              objectId: null,
              objectType: "CHARACTER",
              text: char,
              answers: [
                ...(results[`char-${char}`]?.answers || []),
                splitAnswer[index],
              ],
              marks: [
                ...(results[`char-${char}`]?.marks || []),
                splitAnswer[index] === hiraganaRomajiMap[char]
                  ? "CORRECT"
                  : "INCORRECT",
              ],
            },
          };
        },
        {}
      );
    }

    props.setResults({
      ...results,
      // $FlowFixMe this is fine, I think it just doesn't like two spreads of inexact literals
      ...characterResults,
      [currentTestable.question.text]: {
        objectId: currentTestable.objectId,
        objectType: "WORD",
        text: currentTestable.question.text,
        answers: [
          ...results[getKeyForTestable(currentTestable)].answers,
          csvAnswer,
        ],
        marks: [...results[getKeyForTestable(currentTestable)].marks, mark],
      },
    });
    return mark;
  };

  const helpModal = (
    <OverlayModal
      closeModal={() => setHelpModalVisible(false)}
      title={<Text style={styles.helpModalTitle}>How to answer questions</Text>}
      visible={helpModalVisible}
    >
      <Image
        source={require("../../../../assets/images/how-to-use.gif")}
        style={styles.helpGif}
      />
      <Text style={styles.helpModalBody}>
        🔊 Sound on for pronunciation help 🔊
      </Text>
      <View style={styles.helpModalBottom}>
        <View style={styles.modalButtonWrapper}>
          <Button
            theme="primary_ghost"
            onPress={() => setHelpModalVisible(false)}
          >
            <Text style={styles.buttonQuit}>Close</Text>
          </Button>
        </View>
      </View>
    </OverlayModal>
  );

  return (
    <>
      <View style={sharedStyles.topSection}>
        {/* <ProgressBar testables={lesson.testables} results={results} /> */}
        {getTopSectionContent(
          currentTestable,
          lecturesStatus,
          setExitModalVisible,
          setLecturesStatus
        )}
      </View>
      <View style={styles.bottomSectionBackground}>
        <View style={sharedStyles.bottomSection}>
          {getAnswerSection(currentTestable, children)}
          {getHint(questionStage, currentTestable, currentMark)}
          <AnswerButton
            currentMark={currentMark}
            userAnswer={userAnswer}
            goToNextQuestion={goToNextQuestion}
            answerQuestion={answerRomajiQuestion}
          />
        </View>
      </View>
      {helpModal}
    </>
  );
}

export default WordLesson;
