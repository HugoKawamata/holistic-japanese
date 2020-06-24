/* @flow */
import { StyleSheet } from "react-native";
import color from "../../../util/color";
import { fontSize } from "../../../util/font";

const styles = StyleSheet.create({
  answerFieldWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 16,
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
  contextJapanese: {
    fontSize: fontSize.regular,
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
  prompt: {
    color: color.TEXT,
    fontSize: fontSize.questionType,
    textAlign: "center",
  },
  promptWrapper: {
    alignItems: "stretch",
  },
  question: {
    color: color.WHITE,
    fontSize: fontSize.question,
    textAlign: "center",
  },
  questionWrapper: {
    alignItems: "stretch",
    justifyContent: "center",
    flexGrow: 1,
  },
  questionBubble: {
    alignItems: "center",
    backgroundColor: color.HINT_BG,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginTop: 14,
  },
  questionBubbleWrapper: {
    alignItems: "stretch",
    flexGrow: 1,
    paddingBottom: 40,
    paddingHorizontal: 30,
    width: "100%",
  },
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
  topSection: {
    alignItems: "stretch",
    flexDirection: "column",
    flexGrow: 3,
    justifyContent: "flex-start",
  },
});

export default styles;
