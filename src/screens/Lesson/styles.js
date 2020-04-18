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
  lessonScreenWrapper: {
    alignItems: "flex-start",
    flexDirection: "column",
  },
  notes: {},
  question: {
    fontSize: fontSize.question,
  },
  questionWrapper: {
    justifyContent: "center",
    // width: "100%",
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
});

export default styles;
