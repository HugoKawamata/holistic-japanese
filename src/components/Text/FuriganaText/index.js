// @flow
import React from "react";
import { Text as NativeText, StyleSheet } from "react-native";
import { startGenerateArray } from "./util";

type Props = {|
  furigana: string,
  text: string,
|};

type FuriganaPair = {|
  furigana: string,
  text: string,
|};

export function FuriganaText(props: Props) {
  // const furigana = "わたしのこうざをはじめる"
  // const text = "私の講座を始める"

  const furiganaArray = startGenerateArray(props.furigana, props.text);

  return (
    <View style={styles.wrapper}>
      {furiganaArray.map(({ furigana, text }) => {
        <View style={styles.furiganisedTextWrapper}>
          <Text style={styles.furiganaText}>{furigana}</Text>
          <Text style={styles.mainText}>{text}</Text>
        </View>;
      })}
    </View>
  );
}
