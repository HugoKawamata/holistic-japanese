/* @flow */
import React, { type Node } from "react";
import { Text as NativeText, StyleSheet } from "react-native";
import color from "../../util/color";
import { fontSize } from "../../util/font";

const baseStyle = StyleSheet.create({
  base: {
    color: color.TEXT_DARK,
    fontFamily: "Lato",
    fontSize: fontSize.regular,
  },
});

type TextChildren = string;

type Props = {
  children: TextChildren,
  // eslint-disable-next-line flowtype/no-weak-types
  style?: any,
  // eslint-disable-next-line flowtype/no-weak-types
  [string]: any, // Allow native text props
};

export default function Text(props: Props): Node {
  const { style, children } = props;
  const styles = [baseStyle.base].concat(style || []);

  return (
    // $FlowFixMe
    <NativeText {...props} style={styles}>
      {children}
    </NativeText>
  );
}

Text.defaultProps = {
  style: null,
};
