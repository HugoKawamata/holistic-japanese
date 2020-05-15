/* @flow */
import React, { type Node } from "react";
import { View, Dimensions } from "react-native";
import Text from "../../components/Text";
import FuriganaText from "../../components/Text/FuriganaText";
import TransformText from "../../components/Text/TransformText";
import Button from "../../components/Button";
import type { AvailableLessons_user_availableCourses_availableLessons_testables as Testable } from "../Learn/__generated__/AvailableLessons";
import { getCSVAnswer } from "./util";
import type { UserAnswer } from "./types";
import styles from "./styles";

const { height } = Dimensions.get("window");

export const getTopSectionContent = (currentTestable: Testable) => (
  <>
    {height > 730 ? (
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>レッスン・Lesson</Text>
      </View>
    ) : null}
    <View style={styles.questionWrapper}>
      <Text style={styles.question}>{currentTestable.question.text}</Text>
    </View>
  </>
);

export const getQuestionTypeText = (currentTestable: Testable) => {
  if (
    currentTestable.question.type === "J_WORD" &&
    currentTestable.answer.type === "ROMAJI"
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
      <Button theme="secondary" onPress={goToNextQuestion}>
        <FuriganaText
          furiStyle={styles.buttonText}
          textStyle={styles.buttonText}
          kana="せいかい"
          text="正解"
        />
        <Text style={styles.buttonText}>Correct!</Text>
      </Button>
    );
  }
  if (currentMark === "INCORRECT") {
    return (
      <Button theme="tertiary" onPress={goToNextQuestion}>
        <FuriganaText
          furiStyle={styles.buttonText}
          textStyle={styles.buttonText}
          kana="ちがいます"
          text="違います"
        />
        <Text style={styles.buttonText}>Incorrect</Text>
      </Button>
    );
  }
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
};

export const displayEmoji = (
  questionStage: number,
  currentTestable: Testable,
  currentMark: ?("CORRECT" | "INCORRECT")
) => {
  const adjustedQuestionStage =
    currentMark === "CORRECT" ? questionStage - 1 : questionStage;
  if (adjustedQuestionStage >= 2 && currentTestable.introduction != null) {
    return <View style={styles.emojiWrapper} />;
  }

  if (currentTestable.question.emoji != null) {
    return (
      <View style={styles.emojiWrapper}>
        <Text style={styles.emoji}>{currentTestable.question.emoji}</Text>
      </View>
    );
  }
  return null;
};

export const getHint = (
  questionStage: number,
  currentTestable: Testable,
  currentMark: ?("CORRECT" | "INCORRECT")
) => {
  const adjustedQuestionStage =
    currentMark === "CORRECT" ? questionStage - 1 : questionStage;
  if (adjustedQuestionStage === 2) {
    return null;
  }
  let dialogueText = "";
  if (adjustedQuestionStage === 0 && currentTestable.introduction != null) {
    // Give them the answer the first time they see the question
    dialogueText = currentTestable.introduction;
  }

  const emoji = displayEmoji(questionStage, currentTestable, currentMark);

  if (emoji && currentTestable.introduction) {
    return (
      <View style={styles.hintSection}>
        <Text style={styles.hintLabel}>Hint</Text>
        <View style={styles.hintBox}>
          <View style={styles.emojiWrapper}>{emoji}</View>
          <TransformText style={styles.hint}>{dialogueText}</TransformText>
        </View>
      </View>
    );
  }
  return null;
};
