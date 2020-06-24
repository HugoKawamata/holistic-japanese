/* @flow */
import { StyleSheet } from "react-native";
import color from "../../../util/color";
import { fontSize } from "../../../util/font";

const styles = StyleSheet.create({
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
});

export default styles;
