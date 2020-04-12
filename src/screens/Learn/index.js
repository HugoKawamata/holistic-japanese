import * as React from "react";
import { StyleSheet, View } from "react-native";
import Icon from "../../components/Icon";
import Text from "../../components/Text";
import Button from "../../components/Button";
import { FuriganaText } from "../../components/Text/FuriganaText";

const styles = StyleSheet.create({
  learnScreenWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

type Props = {||};

export default function LearnScreen(props: Props) {
  return (
    <View style={styles.learnScreenWrapper}>
      <Button color={color.BUTTON_S} onPress={startLesson}>
        <View style={styles.startButtonContentWrapper}>
          <View style={styles.startButtonEnglishWrapper}>
            <Text style={styles.startButtonEnglish}>Start</Text>
            <Icon name="play_arrow" />
          </View>
          <FuriganaText
            mainStyle={styles.startButtonJapanese}
            furiStyle={styles.startButtonFurigana}
            kana="わたしのこうざをはじめる"
            text="私の講座を始める"
          />
        </View>
      </Button>
    </View>
  );
}
