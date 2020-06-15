/* @flow */
import { StyleSheet } from "react-native";
import color from "../../util/color";
import { fontSize } from "../../util/font";

const answerFieldCommon = {
  backgroundColor: color.INPUT_BG,
  borderRadius: 3,
  fontFamily: "Lato",
  fontSize: fontSize.answerSingleChar,
  textAlign: "center",
  minWidth: 56,
};

const styles = StyleSheet.create({
  answerFieldWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 16,
  },
  buttonWrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  bottomSection: {
    alignItems: "stretch",
    backgroundColor: color.WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: "column",
    flexGrow: 3,
    justifyContent: "flex-end",
    // marginTop: 20,
    paddingTop: 40,
    paddingBottom: 10,
    width: "100%",
  },
  buttonText: {
    color: color.WHITE,
  },
  correction: {
    fontSize: fontSize.answerSingleChar,
    textAlign: "center",
  },
  emoji: {
    fontSize: fontSize.questionEmoji,
  },
  emojiWrapper: {
    flexGrow: 1,
    paddingRight: 10,
  },
  header: {
    color: color.WHITE,
    fontSize: 28,
    fontWeight: "bold",
  },
  headerWrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  hint: {
    color: color.BLACK,
    flexShrink: 1,
    fontSize: fontSize.hint,
  },
  hintBox: {
    alignItems: "center",
    backgroundColor: color.HINT_BG,
    borderRadius: 16,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginTop: 14,
  },
  hintLabel: {
    color: color.TEXT_M,
    fontSize: fontSize.large,
    fontWeight: "bold",
  },
  hintSection: {
    alignItems: "stretch",
    flexGrow: 1,
    paddingBottom: 40,
    paddingHorizontal: 30,
    width: "100%",
  },
  incorrectAnswerField: {
    backgroundColor: color.INCORRECT_INPUT_BG,
  },
  lessonScreenWrapper: {
    alignItems: "stretch",
    backgroundColor: color.KANA_Q_BG,
    justifyContent: "flex-end",
    flexDirection: "column",
    flexGrow: 1,
  },
  lectureImageWrapper: {
    backgroundColor: "#242222",
    borderBottomColor: "#B77940",
    borderLeftColor: "#FFB35A",
    borderRightColor: "#B77940",
    borderTopColor: "#FFB35A",
    borderWidth: 5,
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginHorizontal: 20,
    marginBottom: 34,
    height: "30%",
  },
  lectureImage: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  lectureScreenWrapper: {
    alignItems: "center",
    backgroundColor: color.KANA_Q_BG,
    flexGrow: 1,
    justifyContent: "center",
  },
  lectureTitle: {
    fontSize: 28,
    paddingBottom: 34,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  question: {
    color: color.WHITE,
    fontSize: fontSize.question,
    textAlign: "center",
  },
  questionType: {
    color: color.TEXT,
    fontSize: fontSize.questionType,
    textAlign: "center",
  },
  questionWrapper: {
    alignItems: "stretch",
    justifyContent: "center",
    flexGrow: 1,
  },
  regularAnswerField: {
    ...answerFieldCommon,
  },
  singleCharAnswerField: {
    ...answerFieldCommon,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 5,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 5,
    minWidth: 60,
    maxWidth: 60,
  },
  safeAreaView: {
    flexGrow: 1,
    backgroundColor: color.WHITE,
  },
  topSection: {
    alignItems: "stretch",
    flexDirection: "column",
    flexGrow: 3,
    justifyContent: "flex-start",
  },
});

export default styles;
