// @flow

import React, { type Node } from "react";
import { Text as NativeText, StyleSheet } from "react-native";
import color from "../../util/color";
import { fontSize } from "../../util/font";

const style = StyleSheet.create({
  base: {
    color: color.TEXT_DARK,
    fontFamily: "Lato",
    fontSize: fontSize.regular,
  },
});

type TextChildren = string;

type Props = {
  children: TextChildren,
  style?: *,
  [string]: any, // Allow native text props
};

export default function Text(props: Props): Node {
  const styles = [style.base].concat(props.style ? props.style : []);

  return (
    // $FlowFixMe
    <NativeText {...props} style={styles}>
      {props.children}
    </NativeText>
  );
}
