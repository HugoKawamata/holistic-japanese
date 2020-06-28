/* @flow */
import { StyleSheet } from "react-native";
import color from "../../../util/color";
import { fontSize } from "../../../util/font";

const styles = StyleSheet.create({
  answerFieldWrapper: {
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  bottomSection: {
    alignItems: "stretch",
    backgroundColor: color.WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: "column",
    justifyContent: "flex-end",
    // marginTop: 20,
    paddingTop: 40,
    paddingBottom: 10,
    width: "100%",
  },
  contextBubble: {
    backgroundColor: color.HINT_BG,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  contextBubbleWrapper: {
    alignItems: "flex-start",
    flexDirection: "column",
    marginHorizontal: 16,
  },
  contextFurigana: {
    fontSize: fontSize.smallish,
  },
  contextEnglish: {
    fontSize: fontSize.smallish,
  },
  contextJapanese: {
    fontSize: fontSize.regular,
  },
  contextWrapper: {
    alignItems: "stretch",
    justifyContent: "center",
    flexGrow: 1,
  },
  downChevWrapper: {
    alignItems: "center",
  },
  exitWrapper: {
    alignItems: "center",
    backgroundColor: "rgba(88, 88, 88, 0.2)",
    borderRadius: 50,
    height: 45,
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 10,
    padding: 5,
    position: "absolute",
    width: 45,
  },
  questionBubble: {
    // alignItems: "center",
    backgroundColor: color.HINT_BG,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginTop: 14,
  },
  questionBubbleText: {},
  questionBubbleWrapper: {
    alignItems: "stretch",
    flexGrow: 1,
    paddingBottom: 10,
    paddingHorizontal: 30,
    width: "100%",
  },
  sentenceQuestionWrapper: {},
  speakerName: {
    fontSize: fontSize.hint,
    flexShrink: 1,
  },
  speakerNameWrapper: {
    backgroundColor: color.INCOMPLETE_CELL,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginLeft: 16,
  },
});

export default styles;
