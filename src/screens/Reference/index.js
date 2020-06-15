/* @flow */
import React, { type Node } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import SideSlider from "../../components/SideSlider";
import Text from "../../components/Text";
import color from "../../util/color";
import { fontSize } from "../../util/font";

const styles = StyleSheet.create({
  buttonText: {
    color: color.WHITE,
  },
  heading: {
    fontSize: fontSize.lessonTitle,
    fontWeight: "bold",
  },
  headingWrapper: {
    paddingBottom: 36,
    paddingLeft: 16,
    // paddingTop: 40,
  },
  referenceScreenWrapper: {
    alignItems: "stretch",
    backgroundColor: color.WHITE,
    paddingTop: 40,
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  root: {
    backgroundColor: color.WHITE,
    flexGrow: 1,
  },
  startButtonEnglish: {
    color: color.WHITE,
    fontSize: fontSize.englishButton,
    textAlign: "center",
  },
});

type Props = {|
  navigation: any, // eslint-disable-line flowtype/no-weak-types
|};

export function LearnScreen(props: Props): Node {
  // eslint-disable-next-line react/destructuring-assignment
  props.navigation.setOptions({
    headerShown: false,
  });

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.referenceScreenWrapper}>
        <View style={styles.headingWrapper}>
          <Text style={styles.heading}>Reference</Text>
        </View>
        <SideSlider
          heading="Characters"
          linkCardProps={[
            {
              key: "1",
              bigText: "ひらがな",
              smallText: "Hiragana",
              onPress: () => props.navigation.navigate("Hiragana"),
            },
            {
              key: "2",
              bigText: "カタカナ",
              smallText: "Katakana",
              disabled: true,
              onPress: () => {},
            },
          ]}
        />
        <SideSlider
          heading="Conversation"
          linkCardProps={[
            {
              key: "3",
              bigText: "ことば",
              smallText: "Words",
              disabled: true,
              onPress: () => {},
            },
            {
              key: "4",
              bigText: "ぶんけい",
              smallText: "Sentence patterns",
              disabled: true,
              onPress: () => {},
            },
          ]}
        />
      </ScrollView>
    </View>
  );
}

export default LearnScreen;
