/* @flow */
import * as React from "react";
import { View } from "react-native";
import color from "../../../util/color";
import Icon from "../../../components/Icon";
import type {
  AvailableLessons_me_availableCourses_availableLessons_testables as Testable,
  AvailableLessons_me_splots as Splots,
} from "../../Learn/__generated__/AvailableLessons";
import type { UserAnswer, Results } from "../types";
import { getKeyForTestable } from "../util";
import { sharedStyles } from "../styles";
import AnswerButton from "../AnswerButton";
import {
  getTopSectionContent,
  getAnswerSection,
  getSentenceQuestion,
  addSplotsToText,
} from "./sectionRenderers";
import styles from "./styles";

type Props = {|
  children: React.Node, // Children is always the answer field node
  currentMark: ?("CORRECT" | "INCORRECT"),
  currentTestable: Testable,
  goToNextQuestion: () => void,
  setExitModalVisible: (boolean) => void,
  results: Results,
  setCurrentMark: ("CORRECT" | "INCORRECT" | null | typeof undefined) => void,
  setResults: (Results) => void,
  splots: Splots,
  userAnswer: UserAnswer,
|};

export function SentenceLesson(props: Props) {
  const {
    children,
    currentMark,
    currentTestable,
    goToNextQuestion,
    setExitModalVisible,
    results,
    splots,
    userAnswer,
  } = props;

  const cleanPossibleAnswers = (possibleAnswers: Array<string>) => {
    return possibleAnswers.map((possibleAnswer) => {
      return addSplotsToText(
        // eslint-disable-next-line no-irregular-whitespace
        possibleAnswer.replace(/[.()　]/g, ""),
        splots
      ).toLowerCase();
    });
  };

  const cleanUserAnswer = (answer: string, answerType: string) => {
    if (answerType === "JAPANESE") {
      return (
        answer
          .toLowerCase()
          // eslint-disable-next-line no-irregular-whitespace
          .replace(/[ .()　。！？]/g, "")
          .trim()
      );
    }
    return (
      answer
        .toLowerCase()
        // eslint-disable-next-line no-irregular-whitespace
        .replace(/[　’.!?]/g, "")
        .trim()
    );
  };

  const answerQuestion = () => {
    const possibleAnswers = cleanPossibleAnswers(
      currentTestable.answer.text.split("/")
    );
    const cleanedAnswer = cleanUserAnswer(
      userAnswer["input-0"],
      currentTestable.answer.type
    );
    let mark;

    if (possibleAnswers.includes(cleanedAnswer)) {
      props.setCurrentMark("CORRECT");
      mark = "CORRECT";
    } else {
      props.setCurrentMark("INCORRECT");
      mark = "INCORRECT";
    }

    const key: string = getKeyForTestable(currentTestable);
    props.setResults({
      ...results,
      [key]: {
        objectId: currentTestable.objectId,
        objectType: "TESTABLE",
        text: currentTestable.question.text,
        answers: [...results[key].answers, userAnswer],
        marks: [...results[key].marks, mark],
      },
    });

    return mark;
  };

  return (
    <>
      <View style={sharedStyles.topSection}>
        {getTopSectionContent(currentTestable, setExitModalVisible)}
      </View>
      <View style={styles.bottomSection}>
        {getSentenceQuestion(currentTestable, splots)}
        <View style={styles.downChevWrapper}>
          <Icon name="expand-more" size={32} color={color.TEXT_L} />
        </View>
        {getAnswerSection(currentTestable, children)}
        <View style={sharedStyles.buttonSection}>
          <AnswerButton
            currentMark={currentMark}
            userAnswer={userAnswer}
            goToNextQuestion={goToNextQuestion}
            answerQuestion={answerQuestion}
          />
        </View>
      </View>
    </>
  );
}

export default SentenceLesson;
