// @flow

import React from "react";
// $FlowFixMe flow 0.112.0 hates react native's types and thinks it has no exports
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

export default function Text(props: Props) {
  const styles = StyleSheet.flatten(
    [style.base].concat(props.style ? props.style : [])
  );

  return <NativeText style={styles}>{props.children}</NativeText>;
}
