// @flow
import { StyleSheet } from "react-native";
import color from "../../util/color";
import { fontSize } from "../../util/font";

const answerFieldCommon = {
  backgroundColor: color.WHITE,
  fontSize: fontSize.answerSingleChar,
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
  fyuchan: {
    height: 100,
    width: 100,
  },
  fyuchanWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  lessonScreenWrapper: {
    alignItems: "center",
    flexDirection: "column",
    flexGrow: 1,
  },
  noteBubble: {
    backgroundColor: color.PURPLE,
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  noteWrapper: {
    width: "90%",
  },
  notes: {
    color: color.WHITE,
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
  topSection: {
    alignItems: "center",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
    // paddingTop: 70,
  },
  triangle: {
    borderTopWidth: 16,
    borderRightWidth: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 10,
    borderTopColor: color.PURPLE,
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
