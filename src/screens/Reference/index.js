// @flow
import React, { useState, type Node, createRef, useEffect } from "react";
import { StyleSheet, View, TextInput, Image } from "react-native";
import Text from "../../components/Text";
import Button from "../../components/Button";
import { fontSize } from "../../util/font";

// TODO: When katakana gets added, make this screen do different things depending on user kana level

const styles = StyleSheet.create({
  japaneseButtonText: {
    fontSize: fontSize.furiganaEnabledText,
  },
  englishButtonText: {
    fontSize: fontSize.regular,
  },
});

type Props = {|
  navigation: any,
|};

export function ReferenceScreen(props: Props) {
  return (
    <Button
      theme="success"
      onPress={() => props.navigation.navigate("ひらがな・Hiragana")}
    >
      <Text style={styles.japaneseButtonText}>ひらがな</Text>
      <Text style={styles.englishButtonText}>Hiragana</Text>
    </Button>
  );
}

export default ReferenceScreen;
