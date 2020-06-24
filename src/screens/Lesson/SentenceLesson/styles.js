/* @flow */
import { StyleSheet } from "react-native";
import color from "../../../util/color";
import { fontSize } from "../../../util/font";

const styles = StyleSheet.create({
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
  contextWrapper: {
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
});

export default styles;
