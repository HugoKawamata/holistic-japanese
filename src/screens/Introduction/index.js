/* @flow */

import React, { useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { connect } from "react-redux";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import type { State as StoreState } from "../../store/types/store";
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
  genderButtonWrapper: {
    alignItems: "center",
    marginBottom: 10,
  },
  genericWrapper: {
    alignItems: "center",
  },
  header: {
    paddingBottom: 10,
  },
  headerText: {
    fontSize: fontSize.modalTitle,
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
    paddingTop: 30,
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

const SEND_GENDER = gql`
  mutation sendGender($userEmail: String!, $gender: String!) {
    sendGender(userId: $userEmail, gender: $gender) {
      me {
        gender
        splots {
          me
          meFuri
        }
      }
    }
  }
`;

type Props = {|
  navigation: any, // eslint-disable-line flowtype/no-weak-types
  userEmail: string,
|};

const introduction = [
  {
    header: "Welcome to Issei!",
    headerJapanese: "Isseiへ　ようこそ",
    headerFurigana: "いっせいへ　ようこそ",
    body:
      "Your journey to conversational Japanese starts here! The aim of the Issei learning method is to get you communicating as soon as possible.",
    icon: "question-answer",
    button: "next",
  },
  {
    header: "How?",
    headerJapanese: "どうやって？",
    headerFurigana: "どうやって？",
    body:
      "You won't learn things like the Japanese alphabet, vocabulary, and grammar one at a time. Learning multiple things at once simulates the experience of being immersed in the language.",
    icon: "whatshot",
    button: "next",
  },
  {
    header: "For example?",
    headerJapanese: "例えば？",
    headerFurigana: "たとえば？",
    body:
      "To start with, you won't just be memorising the Japanese alphabet. You'll be learning common words which use the letters we're teaching. Much more fun, and much more effective!",
    icon: "school",
    button: "next",
  },
  {
    header: "",
    headerJapanese: "例えば？",
    headerFurigana: "たとえば？",
    body:
      "Before we start, we just need your gender so we know which Japanese pronouns to teach first.",
    icon: "wc",
    button: "gender",
  },
  {
    header: "Great!",
    headerJapanese: "いいね！",
    headerFurigana: "いいね！",
    body: 'Let\'s start out with the "Intro to Hiragana" lesson.',
    icon: "play-arrow",
    button: "start",
  },
];

export function IntroductionScreen(props: Props) {
  const { userEmail } = props;
  const [pageNumber, setPageNumber] = useState(0);
  const [sendGender] = useMutation(SEND_GENDER);

  const currentIntro = introduction[pageNumber];

  const next = () => {
    if (pageNumber + 1 === introduction.length) {
      props.navigation.navigate("Learn");
    } else {
      setPageNumber(pageNumber + 1);
    }
  };

  const getButton = (type: "start" | "gender" | "next") => {
    if (type === "start") {
      return (
        <Button theme="primary" onPress={next}>
          <FuriganaText
            furiStyle={styles.buttonText}
            textStyle={styles.buttonText}
            kana="はじめる"
            text="始める"
          />
          <Text style={styles.buttonText}>Start</Text>
        </Button>
      );
    }
    if (type === "gender") {
      return (
        <>
          <View style={styles.genderButtonWrapper}>
            <Button
              theme="primary"
              onPress={() =>
                sendGender({
                  userEmail,
                  gender: "F",
                }).then(() => next)
              }
            >
              <Text style={styles.buttonText}>Female</Text>
            </Button>
          </View>
          <View style={styles.genderButtonWrapper}>
            <Button
              theme="secondary"
              onPress={() =>
                sendGender({
                  userEmail,
                  gender: "F",
                }).then(() => next)
              }
            >
              <Text style={styles.buttonText}>Male</Text>
            </Button>
          </View>
          <View style={styles.genderButtonWrapper}>
            <Button
              theme="tertiary"
              onPress={() =>
                sendGender({
                  userEmail,
                  gender: "F",
                }).then(() => next)
              }
            >
              <Text style={styles.buttonText}>Other/Rather not say</Text>
            </Button>
          </View>
        </>
      );
    }
    return (
      <Button theme="primary" onPress={next}>
        <FuriganaText
          furiStyle={styles.buttonText}
          textStyle={styles.buttonText}
          kana="つぎへ"
          text="次へ"
        />
        <Text style={styles.buttonText}>Next</Text>
      </Button>
    );
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
              // eslint-disable-next-line react/no-array-index-key
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
            {getButton(currentIntro.button)}
          </View>
        </View>
      </View>
    </View>
  );
}

function mapStateToProps(state: StoreState) {
  return {
    userEmail: state.user.user?.email,
  };
}

export default connect(mapStateToProps)(IntroductionScreen);
