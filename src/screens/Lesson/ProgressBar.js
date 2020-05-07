// @flow
import React, { useState, type Node, createRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import color from "../../util/color";

type Props = {|
  complete: number,
  total: number,
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
  return (
    <View style={styles.barWrapper}>
      <View style={[styles.completeSection, { flexGrow: props.complete }]} />
      <View
        style={[styles.elseSection, { flexGrow: props.total - props.complete }]}
      />
    </View>
  );
}

export default ProgressBar;
