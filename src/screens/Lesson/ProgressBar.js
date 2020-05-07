// @flow
import React, { useState, type Node, createRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import color from "../../util/color";
import type { NextLesson_user_nextLesson_testables as Testable } from "../Learn/__generated__/NextLesson";
import type { Results, Result } from "./types";

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
  const totalQuestions =
    props.testables == null
      ? 0
      : props.testables
          .map((testable) => (testable.introduction != null ? 3 : 2))
          .reduce((sum, num) => sum + num);

  const correctAnswers = Object.keys(props.results)
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
