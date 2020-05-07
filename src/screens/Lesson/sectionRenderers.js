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

export const displayEmoji = (
  questionStage: number,
  currentTestable: Testable,
  currentMark: ?("CORRECT" | "INCORRECT")
) => {
  if (
    questionStage >= 2 &&
    !(questionStage === 2 && currentMark === "CORRECT") &&
    currentTestable.introduction != null
  ) {
    return <View style={styles.emojiWrapper} />;
  }

  if (currentTestable.question.emoji != null) {
    return (
      <View style={styles.emojiWrapper}>
        <Text style={styles.emoji}>{currentTestable.question.emoji}</Text>
      </View>
    );
  }
};

export const getHint = (
  questionStage: number,
  currentTestable: Testable,
  currentMark: ?("CORRECT" | "INCORRECT")
) => {
  let dialogueText = null;
  if (currentMark === "CORRECT") {
    dialogueText = "Correct!";
  } else if (currentMark === "INCORRECT") {
    dialogueText = "Incorrect";
  } else if (questionStage === 0) {
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
          <Text style={styles.hint}>{currentTestable.introduction}</Text>
        </View>
      </View>
    );
  }
};
