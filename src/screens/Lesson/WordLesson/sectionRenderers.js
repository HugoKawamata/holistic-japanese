/* @flow */
import React, { type Node } from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";
import Text from "../../../components/Text";
import TransformText from "../../../components/Text/TransformText";
import Icon from "../../../components/Icon";
import type { AvailableLessons_me_availableCourses_availableLessons_testables as Testable } from "../../Learn/__generated__/AvailableLessons";
import color from "../../../util/color";
import type { LecturesStatus } from "..";
import { sharedStyles } from "../styles";
import styles from "./styles";

const { height } = Dimensions.get("window");

export const getTopSectionContent = (
  currentTestable: Testable,
  lecturesStatus: LecturesStatus,
  setExitModalVisible: (boolean) => void,
  setLecturesStatus: (LecturesStatus) => typeof undefined
) => {
  return (
    <View style={styles.topSectionInterior}>
      {height > 730 ? (
        <View style={styles.headerWrapper}>
          <Text style={styles.header}>レッスン・Lesson</Text>
          <TouchableOpacity
            onPress={() => {
              if (lecturesStatus === "undoable") {
                setLecturesStatus("active");
              } else {
                setExitModalVisible(true);
              }
            }}
          >
            <Icon color={color.WHITE} name="keyboard-return" size={32} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.exitWrapper}
          onPress={() => {
            if (lecturesStatus === "undoable") {
              setLecturesStatus("active");
            } else {
              setExitModalVisible(true);
            }
          }}
        >
          <Icon color={color.WHITE} name="keyboard-return" size={32} />
        </TouchableOpacity>
      )}
      <View style={styles.questionWrapper}>
        <Text style={styles.question}>{currentTestable.question.text}</Text>
      </View>
    </View>
  );
};

export const getAnswerSection = (
  currentTestable: Testable,
  fields: Array<Node> | Node
) => {
  return (
    <>
      <Text style={sharedStyles.prompt}>
        Translate these characters to English letters
      </Text>
      <View style={sharedStyles.answerFieldsWrapper}>{fields}</View>
    </>
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
        <View style={sharedStyles.hintBox}>
          <View style={styles.emojiWrapper}>{emoji}</View>
          <TransformText ignoredDelimiters={["("]} style={sharedStyles.hint}>
            {dialogueText}
          </TransformText>
        </View>
      </View>
    );
  }
  return null;
};
