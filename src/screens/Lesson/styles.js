/* @flow */
import { StyleSheet } from "react-native";
import color from "../../util/color";
import { fontSize } from "../../util/font";

const answerFieldCommon = {
  backgroundColor: color.INPUT_BG,
  borderRadius: 3,
  fontFamily: "Lato",
};

export const sharedStyles = StyleSheet.create({
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
  buttonWrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 20,
  },
  buttonText: {
    color: color.WHITE,
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
});

const myStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  correction: {
    fontSize: fontSize.answerSingleChar,
    textAlign: "center",
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
  regularAnswerField: {
    ...answerFieldCommon,
    fontSize: fontSize.regular,
    minWidth: "80%",
    minHeight: 80,
    paddingHorizontal: 15,
  },
  singleCharAnswerField: {
    ...answerFieldCommon,
    fontSize: fontSize.answerSingleChar,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 5,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 5,
    minWidth: 60,
    maxWidth: 60,
    textAlign: "center",
  },
  safeAreaView: {
    flexGrow: 1,
    backgroundColor: color.WHITE,
  },
});

export default myStyles;
