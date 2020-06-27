/* @flow */
import * as React from "react";
import { View, StyleSheet } from "react-native";
import { fontSize } from "../../../util/font";
import Text from "..";
import TransformText from "../TransformText";
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
      {furiganaArray.map(
        ({ furigana, text }, i) =>
          console.log(furigana, text) || (
            // eslint-disable-next-line react/no-array-index-key
            <View key={`${i}`} style={styles.furiganisedTextWrapper}>
              <Text style={[styles.furiganaText, props.furiStyle]}>
                {furigana === text ? "" : furigana}
              </Text>
              <TransformText style={[styles.mainText, props.textStyle]}>
                {text}
              </TransformText>
            </View>
          )
      )}
    </View>
  );
}

FuriganaText.defaultProps = {
  furiStyle: null,
  textStyle: null,
};
