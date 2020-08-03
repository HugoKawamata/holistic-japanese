/* @flow */
import { StyleSheet } from "react-native";
import color from "../../../util/color";
import { fontSize } from "../../../util/font";

const styles = StyleSheet.create({
  bottomSectionBackground: {
    backgroundColor: color.KANA_Q_BG,
  },
  buttonQuit: {
    color: color.TEXT_P,
  },
  emoji: {
    fontSize: fontSize.questionEmoji,
    lineHeight: 54,
  },
  emojiWrapper: {
    flexGrow: 1,
    paddingRight: 10,
  },
  exitWrapper: {
    marginTop: 10,
    marginLeft: 10,
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
  helpGif: {
    borderColor: color.TEXT,
    borderRadius: 3,
    borderWidth: 3,
    marginBottom: 30,
    height: 250,
    width: 250,
  },
  helpModalBody: {
    fontSize: fontSize.smallish,
    marginHorizontal: 20,
  },
  helpModalBottom: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingTop: 20,
  },
  helpModalTitle: {
    fontSize: fontSize.title,
  },
  modalButtonWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  question: {
    color: color.WHITE,
    fontSize: fontSize.question,
    textAlign: "center",
  },
  questionFurigana: {
    color: color.WHITE,
    fontSize: fontSize.veryLarge,
    textAlign: "center",
  },
  questionWrapper: {
    alignItems: "stretch",
    justifyContent: "center",
    flexGrow: 1,
  },
  topSectionInterior: {
    backgroundColor: color.KANA_Q_BG,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexGrow: 1,
  },
});

export default styles;
