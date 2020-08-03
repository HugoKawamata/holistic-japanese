/* @flow */
import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../Text";
import color from "../../util/color";
import { fontSize } from "../../util/font";

const styles = StyleSheet.create({
  bubble: {
    alignItems: "center",
    backgroundColor: color.EMPHA_BG,
    borderRadius: 30,
    paddingHorizontal: 6,
    paddingVertical: 10,
    minWidth: 38,
  },
  text: {
    color: color.TEXT_M,
    fontSize: fontSize.smallish,
  },
});

type Props = {|
  number: number,
|};

export function NumberBubble(props: Props) {
  const { number } = props;

  return (
    <View style={styles.bubble}>
      <Text style={styles.text}>{`${number}`}</Text>
    </View>
  );
}

export default NumberBubble;
