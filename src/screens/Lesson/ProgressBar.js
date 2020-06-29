/* @flow */
import React from "react";
import { View, StyleSheet } from "react-native";
import color from "../../util/color";
import type { AvailableLessons_me_availableCourses_availableLessons_testables as Testable } from "../Learn/__generated__/AvailableLessons";
import type { Results } from "./types";

type Props = {|
  results: Results,
  testables: ?$ReadOnlyArray<Testable>,
|};

const styles = StyleSheet.create({
  barWrapper: {
    flexDirection: "row",
    height: 5,
    width: "100%",
  },
  completeSection: {
    backgroundColor: color.PRIMARY,
  },
  elseSection: {},
});

function ProgressBar(props: Props) {
  const { testables, results } = props;
  const totalQuestions =
    testables == null
      ? 0
      : testables
          .map((testable) => (testable.introduction != null ? 3 : 2))
          .reduce((sum, num) => sum + num);

  const correctAnswers = Object.keys(results)
    .filter((key) => props.results[key].objectId != null)
    .reduce(
      (sum, key) =>
        sum +
        props.results[key].marks.filter((mark) => mark === "CORRECT").length,
      0
    );

  return (
    <View style={styles.barWrapper}>
      <View style={[styles.completeSection, { flexGrow: correctAnswers }]} />
      <View
        style={[
          styles.elseSection,
          { flexGrow: totalQuestions - correctAnswers },
        ]}
      />
    </View>
  );
}

export default ProgressBar;
