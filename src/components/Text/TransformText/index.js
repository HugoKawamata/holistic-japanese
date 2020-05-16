/* @flow */
import * as React from "react";
import { View, StyleSheet, Text as NativeText } from "react-native";
import color from "../../../util/color";
import Text from "..";

type Props = {|
  children: string,
  style: typeof StyleSheet,
|};

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
  },
  highlight: {
    fontWeight: "bold",
    color: color.TEXT_HIGHLIGHT,
  },
  italic: {
    fontStyle: "italic",
  },
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    flexShrink: 1,
    width: "100%",
  },
});

const getStyle = (transformableType, style) => {
  switch (transformableType) {
    case '"':
      return [style, styles.highlight];
    case "_":
      return [style, styles.italic];
    case "*":
      return [style, styles.bold];
    default:
      return style;
  }
};

const splitOnTransformable = (text, style) => {
  const transformableChars = ['"', "_", "*"];
  let currentString = "";
  const components = [];
  for (let i = 0; i < text.length; i += 1) {
    if (transformableChars.includes(currentString[0])) {
      if (text[i] === currentString[0]) {
        components.push(
          <Text key={i} style={getStyle(currentString[0], style)}>
            {currentString.slice(1)}
          </Text>
        );
        currentString = "";
      } else {
        currentString += text[i];
      }
    } else {
      // We are currently in a regular block of text
      // eslint-disable-next-line no-lonely-if
      if (transformableChars.includes(text[i])) {
        // The next character signals a transformable block of text
        components.push(
          <Text key={i} style={style}>
            {currentString}
          </Text>
        );
        currentString = text[i];
      } else if (i + 1 === text.length) {
        // This is the last letter in the text
        currentString += text[i];
        components.push(
          <Text key={i} style={style}>
            {currentString}
          </Text>
        );
      } else {
        currentString += text[i];
      }
    }
  }
  return components;
};

export default function TransformText(props: Props): React.Node {
  const { children, style } = props;
  const textBlocks = splitOnTransformable(children, style);

  return (
    <View style={styles.wrapper}>
      <NativeText>{textBlocks}</NativeText>
    </View>
  );
}
