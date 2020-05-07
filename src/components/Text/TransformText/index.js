// @flow
import * as React from "react";
import { View, StyleSheet, Text as NativeText } from "react-native";
import { fontSize } from "../../../util/font";
import color from "../../../util/color";
import Text from "../../Text";

type Props = {|
  children: string,
  style: typeof StyleSheet,
|};

const styles = StyleSheet.create({
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
    default:
      return style;
  }
};

const splitOnTransformable = (text, style) => {
  const transformableChars = ['"', "_"];
  let currentString = "";
  let components = [];
  for (let i = 0; i < text.length; i += 1) {
    if (transformableChars.includes(currentString[0])) {
      if (text[i] === currentString[0]) {
        components.push(
          <Text style={getStyle(currentString[0], style)}>
            {currentString.slice(1)}
          </Text>
        );
        currentString = "";
      } else {
        currentString += text[i];
      }
    } else {
      // We are currently in a regular block of text
      if (transformableChars.includes(text[i])) {
        // The next character signals a transformable block of text
        components.push(<Text style={style}>{currentString}</Text>);
        currentString = text[i];
      } else {
        currentString += text[i];
      }
    }
  }
  return components;
};

export default function FuriganaText(props: Props): React.Node {
  const textBlocks = splitOnTransformable(props.children, props.style);

  return (
    <View style={styles.wrapper}>
      <NativeText>{textBlocks}</NativeText>
    </View>
  );
}
