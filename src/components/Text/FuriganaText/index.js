/* @flow */
import * as React from "react";
import { View, StyleSheet } from "react-native";
import { fontSize } from "../../../util/font";
import Text from "..";
import { startGenerateArray } from "./util";

type Props = {|
  furiStyle?: ?typeof StyleSheet,
  textStyle?: ?typeof StyleSheet,
  kana: string,
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
  const { kana, text: japanese } = props;
  const furiganaArray = startGenerateArray(kana, japanese);

  return (
    <View style={styles.wrapper}>
      {furiganaArray.map(({ furigana, text }) => (
        // TODO: This key may repeat itself, come up with a better solution
        <View key={`${furigana}-${text}`} style={styles.furiganisedTextWrapper}>
          <Text style={[styles.furiganaText, props.furiStyle]}>
            {furigana === text ? "" : furigana}
          </Text>
          <Text style={[styles.mainText, props.textStyle]}>{text}</Text>
        </View>
      ))}
    </View>
  );
}

FuriganaText.defaultProps = {
  furiStyle: null,
  textStyle: null,
};
