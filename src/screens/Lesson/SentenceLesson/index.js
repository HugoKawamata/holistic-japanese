/* @flow */
import * as React from "react";
import { View } from "react-native";
import color from "../../../util/color";
import Icon from "../../../components/Icon";
import type { AvailableLessons_user_availableCourses_availableLessons_testables as Testable } from "../../Learn/__generated__/AvailableLessons";
import type { UserAnswer, Results } from "../types";
import { getKeyForTestable } from "../util";
import { sharedStyles } from "../styles";
import {
  getTopSectionContent,
  getAnswerSection,
  getButton,
  getSentenceQuestion,
} from "./sectionRenderers";
import styles from "./styles";

type Props = {|
  children: React.Node, // Children is always the answer field node
  currentMark: ?("CORRECT" | "INCORRECT"),
  currentTestable: Testable,
  goToNextQuestion: () => void,
  results: Results,
  setCurrentMark: ("CORRECT" | "INCORRECT" | null | typeof undefined) => void,
  setResults: (Results) => void,
  userAnswer: UserAnswer,
|};

export function SentenceLesson(props: Props) {
  const {
    children,
    currentMark,
    currentTestable,
    goToNextQuestion,
    results,
    userAnswer,
  } = props;
  const answerQuestion = () => {
    const possibleAnswers = currentTestable.answer.text
      .split("/")
      .map((ans) => ans.toLowerCase());
    const cleanUserAnswer = userAnswer["input-0"]
      .toLowerCase()
      .replace("’", "")
      .trim();
    let mark;

    if (possibleAnswers.includes(cleanUserAnswer)) {
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
  };

  return (
    <>
      <View style={sharedStyles.topSection}>
        {getTopSectionContent(currentTestable)}
      </View>
      <View style={styles.bottomSection}>
        {getSentenceQuestion(currentTestable)}
        <View style={styles.downChevWrapper}>
          <Icon name="expand-more" size={32} color={color.TEXT_L} />
        </View>
        {getAnswerSection(currentTestable, children)}
        <View style={sharedStyles.buttonSection}>
          <View style={sharedStyles.buttonWrapper}>
            {getButton(
              currentMark,
              userAnswer,
              goToNextQuestion,
              answerQuestion
            )}
          </View>
        </View>
      </View>
    </>
  );
}

export default SentenceLesson;