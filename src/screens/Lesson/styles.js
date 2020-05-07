// @flow
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

const dialogueBubbleShadow = {
  shadowColor: color.SHADOW,
  shadowOffset: { width: 10, height: 10 },
  shadowOpacity: 0.4,
  shadowRadius: 10,
};

const styles = StyleSheet.create({
  answerFieldWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 16,
  },
  buttonWrapper: {
    alignItems: "center",
    paddingTop: 20,
    width: "100%",
  },
  bottomSection: {
    alignItems: "center",
    backgroundColor: color.WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 80,
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
    fontSize: 16,
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
    // flexShrink: 1,
    alignItems: "stretch",
    paddingTop: 40,
    paddingBottom: 50,
    paddingHorizontal: 30,
    width: "100%",
  },
  incorrectAnswerField: {
    backgroundColor: color.INCORRECT_INPUT_BG,
  },
  lessonScreenWrapper: {
    alignItems: "stretch",
    backgroundColor: color.KANA_Q_BG,
    flexDirection: "column",
    flexGrow: 1,
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
    color: color.WHITE,
    fontSize: fontSize.question,
    textAlign: "center",
  },
  questionType: {
    color: color.TEXT,
    fontSize: fontSize.questionType,
    textAlign: "left",
  },
  questionWrapper: {
    alignItems: "stretch",
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
    paddingLeft: 0,
    paddingRight: 0,
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
    alignItems: "stretch",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

export default styles;
