// @flow
import { Dimensions, StyleSheet } from "react-native";
import color from "../../../util/color";
import { fontSize } from "../../../util/font";

const { width } = Dimensions.get("window");

const basicCell = {
  alignItems: "center",
  borderRadius: width * 0.16,
  height: width * 0.14,
  justifyContent: "center",
  paddingVertical: 7,
  marginHorizontal: width * 0.01,
  marginVertical: width * 0.01,
  width: width * 0.14,
};

const basicCellKana = {
  fontSize: fontSize.referenceTableCell,
  marginBottom: -6,
};

export const styles = StyleSheet.create({
  completeCell: {
    ...basicCell,
    shadowColor: color.COMPLETE_CELL_SHADOW,
    shadowOffset: { height: 0.5 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    backgroundColor: color.COMPLETE_CELL,
  },
  completeCellKana: {
    ...basicCellKana,
  },
  completeCellRomaji: {
    fontSize: fontSize.regular,
  },
  hiraganaReferenceScreenWrapper: {
    alignItems: "center",
    width,
  },
  incompleteCell: {
    ...basicCell,
    backgroundColor: color.INCOMPLETE_CELL,
  },
  incompleteCellKana: {
    ...basicCellKana,
    color: color.TEXT_M,
  },
  incompleteCellRomaji: {
    color: color.TEXT_M,
    fontSize: fontSize.regular,
  },
  list: {
    flex: 1,
  },
  mainMatrixWrapper: {
    marginBottom: 30,
    paddingLeft: width * 0.02,
    paddingRight: width * 0.06,
    width: width,
  },
  modalTitle: {
    fontSize: fontSize.modalTitle,
  },
  nullCell: {
    ...basicCell,
    backgroundColor: color.INCOMPLETE_CELL,
  },
  row: {
    flexDirection: "row",
    width: "100%",
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
    paddingBottom: 10,
  },
  titleText: {
    color: color.TEXT_M,
    fontSize: fontSize.title,
  },
  yAxisLabel: {
    // idk
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.1,
  },
  xAxisRow: {
    flexDirection: "row",
    height: 30,
    paddingLeft: width * 0.12,
    paddingRight: width * 0.06,
  },
  xAxisLabel: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: width * 0.01,
    width: width * 0.14,
  },
  xAxisText: {
    color: color.TEXT_L,
  },
  yAxisText: {
    color: color.TEXT_L,
  },
});

export default styles;
