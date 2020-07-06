/* @flow */
import { StyleSheet } from "react-native";
import color from "../../../util/color";

const styles = StyleSheet.create({
  exitWrapper: {
    marginTop: 30,
    marginLeft: 15,
    top: 0,
    left: 0,
    position: "absolute",
    zIndex: 1,
  },
  lectureBackButtonWrapper: {
    flexShrink: 3,
  },
  lectureNextButtonWrapper: {
    flexShrink: 1,
  },
  lectureButtonSection: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 20,
    width: "100%",
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
    backgroundColor: color.WHITE,
    flexGrow: 1,
    justifyContent: "center",
  },
  lectureTitle: {
    fontSize: 28,
    paddingBottom: 34,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  noLectureBackButton: {
    opacity: 0,
  },
  redButtonText: {
    color: color.PRIMARY,
  },
});

export default styles;
