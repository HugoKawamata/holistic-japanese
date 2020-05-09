// @flow
import React, { useState, type Node } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { gql } from "apollo-boost";
import type { State as StoreState } from "../../store/types/store";
import client from "../../apollo";
import Text from "../../components/Text";
import Button from "../../components/Button";
import SideSlider from "../../components/SideSlider";
import FuriganaText from "../../components/Text/FuriganaText";
import color from "../../util/color";
import { fontSize } from "../../util/font";

const styles = StyleSheet.create({
  buttonText: {
    color: color.WHITE,
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
  navigation: any,
  userEmail: string,
|};

export function LearnScreen(props: Props): Node {
  const [loading, setLoading] = useState(false);

  props.navigation.setOptions({
    headerShown: false,
  });

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.referenceScreenWrapper}>
        <SideSlider
          heading="Characters"
          linkCardProps={[
            {
              bigText: "ひらがな",
              smallText: "Hiragana",
              blockOut: false,
              onPress: () => props.navigation.navigate("Hiragana"),
            },
            {
              bigText: "カタカナ",
              smallText: "Katakana",
              disabled: true,
              blockOut: false,
              onPress: () => {},
            },
          ]}
        />
        <SideSlider
          heading="Conversation"
          linkCardProps={[
            {
              bigText: "ことば",
              smallText: "Words",
              disabled: true,
              blockOut: false,
              onPress: () => {},
            },
            {
              bigText: "ぶんけい",
              smallText: "Sentence patterns",
              disabled: true,
              blockOut: false,
              onPress: () => {},
            },
          ]}
        />
      </ScrollView>
    </View>
  );
}

function mapStateToProps(state: StoreState) {
  return {
    userEmail: state.user.user?.email,
    userGivenName: state.user.user?.givenName,
  };
}

export default connect(mapStateToProps)(LearnScreen);
