// @flow

import React from "react";
import { View, Image } from "react-native";
import Text from "../../components/Text";
import FuriganaText from "../../components/Text/FuriganaText";
import Button from "../../components/Button";
import styles from "./styles";

type Props = {|
  preface: [any], // TODO: set up apollo type generation
  setPreface: (any) => typeof undefined,
|};

export function PrefaceScreen(props: Props) {
  const currentPreface = props.preface[0];
  return (
    <View style={styles.prefaceScreenWrapper}>
      <View style={styles.prefaceImageWrapper}>
        <Image style={styles.prefaceImage} source={currentPreface.image} />
      </View>
      <View style={styles.prefaceDialogueSectionWrapper}>
        <View style={styles.dialogueWrapper}>
          <View style={styles.dialogueBubble}>
            <Text style={styles.dialogue}>{currentPreface.text}</Text>
          </View>
          <View style={styles.triangleWrapper}>
            <View style={styles.triangle} />
          </View>
        </View>
        <View style={styles.fyuchanWrapper}>
          <Image
            style={styles.fyuchan}
            source={require("../../../assets/images/fyu-mouth-open.png")}
          />
        </View>
      </View>
      <View style={styles.bottomSection}>
        {props.preface.length === 1 ? (
          <Button
            theme="success"
            onPress={() => props.setPreface(props.preface.slice(1))}
          >
            <FuriganaText kana="はじめる！" text="始める！" />
            <Text>Start!</Text>
          </Button>
        ) : (
          <Button
            theme="action"
            onPress={() => props.setPreface(props.preface.slice(1))}
          >
            <FuriganaText kana="つぎへ" text="次へ" />
            <Text>Next</Text>
          </Button>
        )}
      </View>
    </View>
  );
}
