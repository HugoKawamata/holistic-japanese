// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../../Text";
import { startGenerateArray } from "./util";

type Props = {|
  kana: string,
  text: string,
|};

type FuriganaPair = {|
  furigana: string,
  text: string,
|};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
  },
  furiganisedTextWrapper: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  furiganaText: {
    fontSize: 12,
  },
  mainText: {
    fontSize: 22,
  },
});

export default function FuriganaText(props: Props) {
  const furiganaArray = startGenerateArray(props.kana, props.text);

  return (
    <View style={styles.wrapper}>
      {furiganaArray.map(({ furigana, text }) => (
        <View style={styles.furiganisedTextWrapper}>
          <Text style={styles.furiganaText}>
            {furigana === text ? null : furigana}
          </Text>
          <Text style={styles.mainText}>{text}</Text>
        </View>
      ))}
    </View>
  );
}
