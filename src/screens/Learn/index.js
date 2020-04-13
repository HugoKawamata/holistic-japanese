// @flow
import React, { useState } from "react";
// $FlowFixMe flow 0.112.0 hates react native's types and thinks it has no exports
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

type Props = {|
  navigation: any,
|};

export default function LearnScreen(props: Props) {
  const [loading, setLoading] = useState(false);

  const startLesson = () => {
    setLoading(true);

    const fakeGqlQuery = {
      error: null,
      data: {
        lesson: {
          contentType: "hiragana-a", // Could also be hiragana-ka..., katakana-a..., or advanced
          testables: [
            {
              question: {
                type: "japanese",
                image: null,
                text: "あお",
              },
              answer: {
                type: "romaji",
                text: "a,o",
                audio: null,
              },
              notes: {
                text:
                  'This word means "blue". The first letter is "a" and the second letter is "o". Make sure you listen to the pronunciation!',
              },
            },
            {
              question: {
                type: "japanese",
                image: null,
                text: "いえ",
              },
              answer: {
                type: "romaji",
                text: "i,e",
                audio: null,
              },
              notes: {
                text:
                  'This is "house". The first letter is "i" and the second letter is "e".',
              },
            },
            {
              question: {
                type: "japanese",
                image: null,
                text: "いいえ",
              },
              answer: {
                type: "romaji",
                text: "i,i,e",
                audio: null,
              },
              notes: {
                text:
                  'This word means "no". It\'s very similar to "house" isn\'t it? The only difference is you say "ii" for longer.',
              },
            },
            {
              question: {
                type: "japanese",
                image: null,
                text: "うえ",
              },
              answer: {
                type: "romaji",
                text: "u,e",
                audio: null,
              },
              notes: {
                text:
                  'This word means "up". The first letter is "u". You should already know the second letter!',
              },
            },
          ],
          preface: [
            {
              text:
                "Hiragana consists of 5 characters that represent vowel sounds (A, I, U, E, O) and 40 characters that represent a consonant plus a vowel sound (K, S, T, N, H, M, Y, ɾ, and W), as well as a single lone consonant (N).",
              image: null,
            },
            {
              text:
                'Because the characters represent syllables, they are always pronounced the same. Unlike in english, where "same" is pronouned with a long A sound, the Japanese "さめ" (sa・me) is pronounced "sah-meh".',
              image: null,
            },
            {
              text:
                "Let's start learning the first 5 hiragana, which represent the vowel sounds by themselves!",
              image: null,
            },
          ],
        },
      },
    };

    Promise.resolve()
      .then(() => fakeGqlQuery)
      .then((result) => {
        setLoading(false);
        props.navigation.push("Lesson", {
          lesson: result.data.lesson,
        });
        return result;
      });
  };

  return (
    <View style={styles.learnScreenWrapper}>
      <Button color={color.BUTTON_S} onPress={startLesson}>
        <View style={styles.startButtonContentWrapper}>
          <View style={styles.startButtonEnglishWrapper}>
            <Text style={styles.startButtonEnglish}>Start</Text>
          </View>
          <FuriganaText
            textStyle={styles.startButtonJapanese}
            furiStyle={styles.startButtonFurigana}
            kana="わたしのこうざをはじめる"
            text="私の講座を始める"
          />
        </View>
      </Button>
    </View>
  );
}
