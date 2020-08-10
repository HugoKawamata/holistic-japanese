/* @flow */
import { StyleSheet } from "react-native";
import color from "../../../util/color";
import { fontSize } from "../../../util/font";

const styles = StyleSheet.create({
  answerFieldWrapper: {
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  backgroundImage: {
    flex: 1,
    alignItems: "stretch",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "center",
  },
  bottomSectionTip: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    backgroundColor: color.WHITE,
    zIndex: 99,
  },
  bottomSection: {
    alignItems: "stretch",
    backgroundColor: color.WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingTop: 10,
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
    justifyContent: "flex-end",
    marginHorizontal: 16,
    marginBottom: 20,
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
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-between",
    marginTop: 60,
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
    zIndex: 1,
  },
  personWrapper: {
    justifyContent: "flex-start",
    marginBottom: 20,
    marginHorizontal: 20,
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
