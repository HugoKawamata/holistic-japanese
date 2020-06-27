/* @flow */
import * as React from "react";
import { View } from "react-native";
import type { AvailableLessons_user_availableCourses_availableLessons_testables as Testable } from "../../Learn/__generated__/AvailableLessons";
import type { UserAnswer, Results } from "../types";
import {
  getSplitQuestion,
  hiraganaRomajiMap,
  getCSVAnswer,
  getKeyForTestable,
} from "../util";
import { sharedStyles } from "../styles";
import {
  getTopSectionContent,
  getAnswerSection,
  getHint,
  getButton,
} from "./sectionRenderers";
import styles from "./styles";

type Props = {|
  children: React.Node, // Children is always the answer field node
  currentMark: ?("CORRECT" | "INCORRECT"),
  currentTestable: Testable,
  goToNextQuestion: () => void,
  questionStage: number,
  results: Results,
  setCurrentMark: ("CORRECT" | "INCORRECT" | null | typeof undefined) => void,
  setResults: (Results) => void,
  userAnswer: UserAnswer,
|};

export function WordLesson(props: Props) {
  const {
    children,
    currentMark,
    currentTestable,
    goToNextQuestion,
    questionStage,
    results,
    userAnswer,
  } = props;
  const answerRomajiQuestion = () => {
    const splitQuestion = getSplitQuestion(currentTestable);
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

    const characterResults = splitQuestion.reduce(
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
  };

  return (
    <>
      <View style={sharedStyles.topSection}>
        {/* <ProgressBar testables={lesson.testables} results={results} /> */}
        {getTopSectionContent(currentTestable)}
      </View>
      <View style={styles.bottomSectionBackground}>
        <View style={sharedStyles.bottomSection}>
          {getHint(questionStage, currentTestable, currentMark)}
          {getAnswerSection(currentTestable, children)}
          <View style={sharedStyles.buttonSection}>
            <View style={sharedStyles.buttonWrapper}>
              {getButton(
                currentMark,
                userAnswer,
                goToNextQuestion,
                answerRomajiQuestion
              )}
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

export default WordLesson;
