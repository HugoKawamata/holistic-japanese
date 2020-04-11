// @flow

import React from "react";
import { Text as NativeText, StyleSheet } from "react-native";

const style = StyleSheet.create({
  base: {
    fontFamily: "Lato",
  },
});

type TextChildren =
  | string
  | Element<FormattedDate>
  | Element<FormattedMessage>
  | Element<FormattedTime>;

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
