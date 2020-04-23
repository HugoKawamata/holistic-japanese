// @flow

import React from "react";
import { View, Image } from "react-native";
import Text from "../../components/Text";
import FuriganaText from "../../components/Text/FuriganaText";
import Button from "../../components/Button";
import styles from "./styles";

type Props = {|
  image: string,
  setLessonStarted: (boolean) => typeof undefined,
  title: string,
|};

export function TitleScreen(props: Props) {
  return (
    <View style={styles.titleScreenWrapper}>
      <View style={styles.titleTextWrapper}>
        <Text style={styles.titleText}>{props.title}</Text>
      </View>
      <View style={styles.titleImageWrapper}>
        <Image
          style={styles.titleImage}
          source={{ uri: props.image }}
          resizeMode="contain"
        />
      </View>
      <Button theme="success" onPress={() => props.setLessonStarted(true)}>
        <FuriganaText kana="はじめる！" text="始める！" />
        <Text>Start!</Text>
      </Button>
    </View>
  );
}

export default TitleScreen;
