// @flow
import * as React from "react";
import { View, StyleSheet } from "react-native";
import { fontSize } from "../../../util/font";
import Text from "../../Text";
import { startGenerateArray } from "./util";

type Props = {|
  furiStyle?: typeof StyleSheet,
  textStyle?: typeof StyleSheet,
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
    fontSize: fontSize.furigana,
    alignItems: "center",
  },
  mainText: {
    fontSize: fontSize.furiganaEnabledText,
    marginBottom: -4, // This is gross but japanese text has severe natural bottom padding
  },
});

export default function FuriganaText(props: Props): React.Node {
  const furiganaArray = startGenerateArray(props.kana, props.text);

  return (
    <View style={styles.wrapper}>
      {furiganaArray.map(({ furigana, text }) => (
        // TODO: This key may repeat itself, come up with a better solution
        <View key={`${furigana}-${text}`} style={styles.furiganisedTextWrapper}>
          <Text style={styles.furiganaText}>
            {furigana === text ? "" : furigana}
          </Text>
          <Text style={styles.mainText}>{text}</Text>
        </View>
      ))}
    </View>
  );
}
