// @flow
import React from "react";
// $FlowFixMe flow 0.112.0 hates react native's types and thinks it has no exports
import { View, StyleSheet } from "react-native";
import Text from "../../Text";
import { startGenerateArray } from "./util";

type Props = {|
  furiStyle: typeof StyleSheet,
  textStyle: typeof StyleSheet,
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
            {furigana === text ? "" : furigana}
          </Text>
          <Text style={styles.mainText}>{text}</Text>
        </View>
      ))}
    </View>
  );
}
