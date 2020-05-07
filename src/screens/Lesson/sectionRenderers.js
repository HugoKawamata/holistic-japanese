// @flow
import React, { type Node } from "react";
import { View, TextInput, Image } from "react-native";
import Text from "../../components/Text";
import FuriganaText from "../../components/Text/FuriganaText";
import Button from "../../components/Button";
import type {
  NextLesson_user_nextLesson as Lesson,
  NextLesson_user_nextLesson_testables as Testable,
} from "../Learn/__generated__/NextLesson";
import { getCSVAnswer } from "./util";
import type { UserAnswer } from "./types";
import styles from "./styles";

export const getTopSectionContent = (currentTestable: Testable) => (
  <>
    <View style={styles.headerWrapper}>
      <Text style={styles.header}>レッスン・Lesson</Text>
    </View>
    <View style={styles.questionWrapper}>
      <Text style={styles.question}>{currentTestable.question.text}</Text>
    </View>
  </>
);

export const getQuestionTypeText = (currentTestable: Testable) => {
  if (
    currentTestable.question.type == "J_WORD" &&
    currentTestable.answer.type == "ROMAJI"
  ) {
    return "Translate these characters to English letters";
  }
  return "";
};

export const getAnswerSection = (
  currentTestable: Testable,
  fields: Array<Node> | Node
) => (
  <>
    <Text style={styles.questionType}>
      {getQuestionTypeText(currentTestable)}
    </Text>
    <View style={styles.answerFieldWrapper}>{fields}</View>
  </>
);

export const getButton = (
  currentMark: ?("CORRECT" | "INCORRECT"),
  userAnswer: UserAnswer,
  goToNextQuestion: () => void,
  answerRomajiQuestion: () => void
) => {
  if (currentMark === "CORRECT") {
    return (
      <Button theme="primary" onPress={goToNextQuestion}>
        <FuriganaText kana="せいかい" text="正解" />
        <Text>Correct!</Text>
      </Button>
    );
  } else if (currentMark === "INCORRECT") {
    return (
      <Button theme="primary" onPress={goToNextQuestion}>
        <FuriganaText kana="ちがいます" text="違います" />
        <Text>Incorrect</Text>
      </Button>
    );
  } else {
    return (
      <Button
        theme="primary"
        onPress={answerRomajiQuestion}
        disabled={getCSVAnswer(userAnswer) === ""}
      >
        <FuriganaText
          furiStyle={styles.buttonText}
          textStyle={styles.buttonText}
          kana="こたえる"
          text="答える"
        />
        <Text style={styles.buttonText}>Answer</Text>
      </Button>
    );
  }
};
