/* @flow */
import * as React from "react";
import { View, StyleSheet } from "react-native";
import { fontSize } from "../../../util/font";
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

  console.log(furiganaArray);
  return (
    <View style={styles.wrapper}>
      {furiganaArray.map(({ furigana, text }, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={`${i}`} style={styles.furiganisedTextWrapper}>
          <TransformText
            style={[styles.furiganaText, props.furiStyle]}
            noWrapper
          >
            {furigana === text ? "" : furigana}
          </TransformText>
          <TransformText style={[styles.mainText, props.textStyle]} noWrapper>
            {text}
          </TransformText>
        </View>
      ))}
    </View>
  );
}

FuriganaText.defaultProps = {
  furiStyle: null,
  textStyle: null,
};
