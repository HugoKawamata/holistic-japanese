import * as React from "react";
import { StyleSheet, View } from "react-native";
// import Icon from "../../components/Icon";
import Text from "../../components/Text";
import Button from "../../components/Button";
import FuriganaText from "../../components/Text/FuriganaText";
import color from "../../util/color";

const styles = StyleSheet.create({
  learnScreenWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

type Props = {||};

const startLesson = () => {};

export default function LearnScreen(props: Props) {
  return (
    <View style={styles.learnScreenWrapper}>
      <FuriganaText
        mainStyle={styles.startButtonJapanese}
        furiStyle={styles.startButtonFurigana}
        kana="わたしのこうざをはじめる"
        text="私の講座を始める"
      />
      <Button color={color.BUTTON_S} onPress={startLesson}>
        <View style={styles.startButtonContentWrapper}>
          <View style={styles.startButtonEnglishWrapper}>
            <Text style={styles.startButtonEnglish}>Start</Text>
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
