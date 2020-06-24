/* @flow */
import React, { type Node } from "react";
import { View, Dimensions } from "react-native";
import Text from "../../../components/Text";
import FuriganaText from "../../../components/Text/FuriganaText";
import TransformText from "../../../components/Text/TransformText";
import Button from "../../../components/Button";
import type { AvailableLessons_user_availableCourses_availableLessons_testables as Testable } from "../../Learn/__generated__/AvailableLessons";
import { getCSVAnswer } from "../util";
import type { UserAnswer } from "../types";
import { sharedStyles } from "../styles";
import styles from "./styles";

const { height } = Dimensions.get("window");

export const getTopSectionContent = (currentTestable: Testable) => {
  if (currentTestable.question.type === "KANA_WORD") {
    return (
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
  }
  if (["E_SENTENCE", "J_SENTENCE"].includes(currentTestable.question.type)) {
    const hasJapanese =
      currentTestable.context?.japanese != null &&
      currentTestable.context?.japanese !== "";
    return (
      <View style={styles.questionWrapper}>
        <View style={styles.contextBubbleWrapper}>
          <View style={styles.speakerNameWrapper}>
            <Text style={styles.speakerName}>
              {currentTestable.context?.speaker || ""}
            </Text>
          </View>
          <View style={styles.contextBubble}>
            {hasJapanese ? (
              <FuriganaText
                textStyle={styles.contextJapanese}
                furiStyle={styles.contextFurigana}
                text={currentTestable.context?.japanese || ""}
                kana={currentTestable.context?.furigana || ""}
              />
            ) : null}
            {/* If theres no japanese in the context, render the english as big as japanese normally is */}
            <Text
              style={
                hasJapanese ? styles.contextEnglish : styles.contextJapanese
              }
            >
              {currentTestable.context?.english || ""}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  return null;
};

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
) => {
  const text = getQuestionTypeText(currentTestable);
  return (
    <>
      {text !== "" ? <Text style={styles.prompt}>{text}</Text> : null}
      <View style={styles.answerFieldWrapper}>{fields}</View>
    </>
  );
};

export const getButton = (
  currentMark: ?("CORRECT" | "INCORRECT"),
  userAnswer: UserAnswer,
  goToNextQuestion: () => void,
  answerRomajiQuestion: () => void
) => {
  if (currentMark === "CORRECT") {
    return (
      <Button theme="secondary" onPress={goToNextQuestion}>
        <Text style={sharedStyles.buttonText}>Correct!</Text>
      </Button>
    );
  }
  if (currentMark === "INCORRECT") {
    return (
      <Button theme="tertiary" onPress={goToNextQuestion}>
        <Text style={sharedStyles.buttonText}>Incorrect</Text>
      </Button>
    );
  }
  return (
    <Button
      theme="primary"
      onPress={answerRomajiQuestion}
      disabled={getCSVAnswer(userAnswer) === ""}
    >
      <Text style={sharedStyles.buttonText}>Answer</Text>
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
      <View style={sharedStyles.hintSection}>
        {/* <Text style={styles.hintLabel}>Hint</Text> */}
        <View style={sharedStyles.hintBox}>
          <View style={styles.emojiWrapper}>{emoji}</View>
          <TransformText style={sharedStyles.hint}>
            {dialogueText}
          </TransformText>
        </View>
      </View>
    );
  }
  return null;
};

export const getSentenceQuestion = (currentTestable: Testable) => {
  return (
    <View style={styles.sentenceQuestionWrapper}>
      <View style={styles.promptWrapper}>
        <Text style={styles.prompt}>
          {currentTestable.question?.prompt || ""}
        </Text>
      </View>
      <View style={styles.questionBubbleWrapper}>
        <View style={styles.questionBubble}>
          {currentTestable.question.furigana != null &&
          currentTestable.question.furigana !== "" ? (
            <FuriganaText
              text={currentTestable.question.text}
              kana={currentTestable.question.furigana}
              textStyle={styles.questionBubbleText}
              furiStyle={styles.questionBubbleFurigana}
            />
          ) : (
            <Text style={styles.questionBubbleText}>
              {currentTestable.question.text}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};
