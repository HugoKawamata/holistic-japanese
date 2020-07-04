/* @flow */
import React, { useEffect, useRef } from "react";
import { TouchableOpacity, StyleSheet, View, Animated } from "react-native";
import Icon from "../../../components/Icon";
import Text from "../../../components/Text";
import Button from "../../../components/Button";
import color from "../../../util/color";
import { getCSVAnswer } from "../util";
import type { UserAnswer } from "../types";
import { sharedStyles } from "../styles";

const styles = StyleSheet.create({
  invisibleAlignment: {
    opacity: 0,
  },
  nextButton: {
    color: color.PURPLE,
  },
  nextWrapper: {
    alignItems: "center",
    flexDirection: "row",
    flexShrink: 1,
    marginBottom: 3,
    marginLeft: 20,
  },
  resultWrapper: {
    alignItems: "center",
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-between",
  },
});

type Props = {
  currentMark: ?("CORRECT" | "INCORRECT"),
  userAnswer: UserAnswer,
  goToNextQuestion: () => void,
  answerQuestion: () => void,
};

export function AnswerButton(props: Props) {
  const { currentMark, userAnswer, goToNextQuestion, answerQuestion } = props;

  const widthAnim = useRef(new Animated.Value(currentMark != null ? 1 : 0))
    .current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: currentMark != null ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [currentMark]);

  const nextButton = (
    <TouchableOpacity style={styles.nextWrapper} onPress={goToNextQuestion}>
      <Text style={styles.nextButton}>Next</Text>
      <Icon color={color.PURPLE} size={24} name="chevron-right" />
    </TouchableOpacity>
  );

  let result = null;
  if (currentMark === "CORRECT") {
    result = (
      <>
        <View style={styles.invisibleAlignment}>{nextButton}</View>
        <Icon color={color.SUCCESS} size={58} name="check-circle" />
        {nextButton}
      </>
    );
  }
  if (currentMark === "INCORRECT") {
    result = (
      <>
        <View style={styles.invisibleAlignment}>{nextButton}</View>
        <Icon color={color.PRIMARY} size={58} name="cancel" />
        {nextButton}
      </>
    );
  }

  return (
    <>
      <Animated.View
        style={{
          ...sharedStyles.buttonWrapper,
          width: widthAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ["100%", "0%"],
          }),
          opacity: widthAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        }}
      >
        <Button
          theme="primary"
          onPress={() => {
            answerQuestion();
          }}
          disabled={getCSVAnswer(userAnswer) === ""}
        >
          <Text style={sharedStyles.buttonText}>Answer</Text>
        </Button>
      </Animated.View>
      <Animated.View
        style={{
          ...styles.resultWrapper,
          width: widthAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "100%"],
          }),
          opacity: widthAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        }}
      >
        {result}
      </Animated.View>
    </>
  );
}

export default AnswerButton;
