/* @flow */
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, StyleSheet, View, Animated } from "react-native";
import Icon from "../../../components/Icon";
import Text from "../../../components/Text";
import Button from "../../../components/Button";
import color from "../../../util/color";
import { getCSVAnswer } from "../util";
import type { UserAnswer } from "../types";
import { sharedStyles } from "../styles";

const styles = StyleSheet.create({
  barWrapper: {
    flexDirection: "row",
    height: 5,
    width: "100%",
  },
  completeSection: {
    backgroundColor: color.SUCCESS,
  },
  elseSection: {},
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
  goToNextQuestion: (?("CORRECT" | "INCORRECT")) => void,
  answerQuestion: () => "CORRECT" | "INCORRECT",
};

export function AnswerButton(props: Props) {
  const { currentMark, userAnswer, goToNextQuestion, answerQuestion } = props;

  const [timeoutFn, setTimeoutFn] = useState(null);

  const anim = useRef(new Animated.Value(currentMark != null ? 1 : 0)).current;
  const timeoutAnim = useRef(new Animated.Value(currentMark != null ? 1 : 0))
    .current;

  useEffect(() => {
    Animated.timing(timeoutAnim, {
      toValue: currentMark != null ? 1 : 0,
      // Don't animate if going back to answer button
      duration: currentMark != null ? 1500 : 0,
      useNativeDriver: false,
    }).start();
  }, [currentMark]);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: currentMark != null ? 1 : 0,
      // Don't animate if going back to answer button
      duration: currentMark != null ? 200 : 0,
      useNativeDriver: false,
    }).start();
  }, [currentMark]);

  const nextButton = (
    <TouchableOpacity
      style={styles.nextWrapper}
      // Don't pass current mark if the next button is pressed manually
      // because we have the correct results at this point
      onPress={() => {
        clearTimeout(timeoutFn);
        goToNextQuestion();
      }}
    >
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
      <View style={sharedStyles.buttonSection}>
        <Animated.View
          style={{
            ...sharedStyles.buttonWrapper,
            width: anim.interpolate({
              inputRange: [0, 1],
              outputRange: ["100%", "0%"],
            }),
            opacity: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          }}
        >
          <Button
            theme="primary"
            onPress={() => {
              const mark = answerQuestion();
              const t = setTimeout(() => {
                if (mark === "CORRECT") {
                  goToNextQuestion(mark);
                }
              }, 1500);
              setTimeoutFn(t);
            }}
            disabled={getCSVAnswer(userAnswer) === ""}
          >
            <Text style={sharedStyles.buttonText}>Answer</Text>
          </Button>
        </Animated.View>
        <Animated.View
          style={{
            ...styles.resultWrapper,
            width: anim.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"],
            }),
            opacity: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          }}
        >
          {result}
        </Animated.View>
      </View>
      {currentMark === "CORRECT" ? (
        <View style={styles.barWrapper}>
          <Animated.View
            style={{
              ...styles.completeSection,
              width: timeoutAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            }}
          />
          <View
            style={[
              styles.elseSection,
              {
                flexGrow: 1,
              },
            ]}
          />
        </View>
      ) : null}
    </>
  );
}

export default AnswerButton;
