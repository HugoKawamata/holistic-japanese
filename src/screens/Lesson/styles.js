// @flow
import { StyleSheet } from "react-native";
import color from "../../util/color";
import { fontSize } from "../../util/font";

const answerFieldCommon = {
  backgroundColor: color.WHITE,
  borderRadius: 3,
  fontFamily: "Lato",
  fontSize: fontSize.answerSingleChar,
  textAlign: "center",
};

const dialogueBubbleShadow = {
  shadowColor: color.SHADOW,
  shadowOffset: { width: 10, height: 10 },
  shadowOpacity: 0.4,
  shadowRadius: 10,
};

const styles = StyleSheet.create({
  answerFieldWrapper: {
    flexDirection: "row",
  },
  bottomSection: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingBottom: 80,
  },
  correction: {
    fontSize: fontSize.answerSingleChar,
    textAlign: "center",
  },
  dialogue: {
    color: color.TEXT,
    lineHeight: fontSize.regular + 8,
  },
  dialogueBubble: {
    ...dialogueBubbleShadow,
    backgroundColor: color.WHITE,
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  dialogueWrapper: {
    width: "90%",
  },
  fyuchan: {
    height: 100,
    width: 100,
  },
  fyuchanWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  incorrectAnswerField: {
    backgroundColor: color.INCORRECT_INPUT_BG,
  },
  lessonScreenWrapper: {
    alignItems: "center",
    flexDirection: "column",
    flexGrow: 1,
  },
  noteSection: {
    // height: "50%",
  },
  prefaceBottomSection: {
    alignItems: "center",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: 80,
  },
  prefaceDialogueSectionWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  prefaceImageWrapper: {
    paddingTop: 30,
    height: "30%",
    width: "90%",
  },
  prefaceImage: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  prefaceScreenWrapper: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  question: {
    fontSize: fontSize.question,
  },
  questionTypeWrapper: {
    paddingBottom: 20,
  },
  questionType: {
    color: color.TEXT,
    fontSize: fontSize.questionType,
  },
  questionWrapper: {
    alignItems: "center",
    paddingBottom: 80,
    paddingTop: 70,
  },
  regularAnswerField: {
    ...answerFieldCommon,
  },
  singleCharAnswerField: {
    ...answerFieldCommon,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    width: 50,
  },
  titleImageWrapper: {
    paddingTop: 30,
    height: "30%",
    paddingHorizontal: "10%",
    width: "90%",
  },
  titleImage: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titleScreenWrapper: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  titleTextWrapper: {
    paddingBottom: 50,
  },
  titleText: {
    fontSize: fontSize.lessonTitle,
  },
  topSection: {
    alignItems: "center",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  triangle: {
    ...dialogueBubbleShadow,
    borderTopWidth: 16,
    borderRightWidth: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 10,
    borderTopColor: color.WHITE,
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    marginRight: 60,
  },
  triangleWrapper: {
    height: 14,
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
});

export default styles;
