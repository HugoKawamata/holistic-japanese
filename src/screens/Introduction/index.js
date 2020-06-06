/* @flow */

import React, { useState } from "react";
import { View, Image, StyleSheet, ImageBackground } from "react-native";
import Text from "../../components/Text";
import FuriganaText from "../../components/Text/FuriganaText";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import color from "../../util/color";
import { fontSize } from "../../util/font";

const styles = StyleSheet.create({
  body: {
    paddingBottom: 20,
    paddingHorizontal: 30,
  },
  bodyText: {},
  buttonText: {
    color: color.WHITE,
  },
  buttonWrapper: {
    alignItems: "center",
    paddingBottom: 50,
  },
  dotWrapper: {},
  genericWrapper: {
    alignItems: "center",
  },
  header: {
    paddingBottom: 10,
  },
  headerText: {
    fontSize: fontSize.modalTitle,
    // fontWeight: "800",
  },
  image: {
    alignItems: "center",
    borderRadius: 16,
    height: 200,
    justifyContent: "center",
    width: 200,
  },
  imageWrapper: {
    alignItems: "center",
    backgroundColor: color.HINT_BG,
    borderRadius: 16,
    height: 220,
    justifyContent: "center",
    width: 220,
  },
  introduction: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "space-between",
    paddingTop: 70,
  },
  introductionScreenWrapper: {
    backgroundColor: color.WHITE,
    flexGrow: 1,
  },
  progressDots: {
    flexDirection: "row",
    paddingBottom: 20,
  },
});

type Props = {|
  navigation: any, // eslint-disable-line flowtype/no-weak-types
|};

const introduction = [
  {
    header: "Welcome to Issei!",
    headerJapanese: "Isseiへ　ようこそ",
    headerFurigana: "いっせいへ　ようこそ",
    body:
      "Your journey to conversational Japanese starts here! The aim of the Issei Learning Method is to get you communicating as soon as possible.",
    icon: "question-answer",
  },
  {
    header: "How?",
    headerJapanese: "どうやって？",
    headerFurigana: "どうやって？",
    body:
      "You won't learn things like the Japanese alphabet, vocabulary, and grammar one at a time. Learning multiple things at once simulates the experience of being immersed in the language.",
    icon: "whatshot",
  },
  {
    header: "For example?",
    headerJapanese: "例えば？",
    headerFurigana: "たとえば？",
    body:
      "To start with, you won't just be memorising the Japanese alphabet. You'll be learning common words which use the letters we're teaching. Much more fun, and much more effective!",
    icon: "school",
  },
  {
    header: "Great!",
    headerJapanese: "いいね！",
    headerFurigana: "いいね！",
    body: 'Let\'s start out with the "Intro to Hiragana" lesson.',
    icon: "play-arrow",
  },
];

export function IntroductionScreen(props: Props) {
  const [pageNumber, setPageNumber] = useState(0);

  const currentIntro = introduction[pageNumber];

  const next = () => {
    if (pageNumber + 1 === introduction.length) {
      props.navigation.navigate("Learn");
    } else {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <View style={styles.introductionScreenWrapper}>
      <View style={styles.introduction}>
        <View style={styles.imageWrapper}>
          <ImageBackground
            style={styles.image}
            imageStyle={{ borderRadius: 16 }}
            source={require("../../../assets/images/empty-logo.png")}
          >
            <Icon name={currentIntro.icon} size={100} color={color.PRIMARY} />
          </ImageBackground>
        </View>
        <View style={styles.genericWrapper}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{currentIntro.header}</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.bodyText}>{currentIntro.body}</Text>
          </View>
        </View>
        <View style={styles.genericWrapper}>
          <View style={styles.progressDots}>
            {introduction.map((_, i) => (
              <View style={styles.dotWrapper} key={i}>
                <Icon
                  name="fiber-manual-record"
                  size={16}
                  color={
                    pageNumber === i ? color.TEXT_M : color.INCOMPLETE_CELL
                  }
                />
              </View>
            ))}
          </View>
          <View style={styles.buttonWrapper}>
            <Button theme="primary" onPress={next}>
              <FuriganaText
                furiStyle={styles.buttonText}
                textStyle={styles.buttonText}
                kana="つぎへ"
                text="次へ"
              />
              <Text style={styles.buttonText}>Next</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

export default IntroductionScreen;
