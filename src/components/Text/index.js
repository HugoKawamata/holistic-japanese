// @flow

import React, { type Node } from "react";
import { Text as NativeText, StyleSheet } from "react-native";

const style = StyleSheet.create({
  base: {
    fontFamily: "Lato",
  },
});

type TextChildren = string;

type Props = {|
  children: TextChildren,
  style?: *,
|};

export default function Text(props: Props): Node {
  const styles = StyleSheet.flatten(
    [style.base].concat(props.style ? props.style : [])
  );

  return <NativeText style={styles}>{props.children}</NativeText>;
}
