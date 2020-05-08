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

const NEXT_LESSON_QUERY = gql`
  query NextLesson($email: String!) {
    user(email: $email) {
      id
      nextLesson {
        content
        lectures {
          title
          text
          image
          position
        }
        titleScreen {
          title
          image
        }
        testables {
          objectId
          objectType
          question {
            type
            emoji
            image
            text
          }
          answer {
            type
            text
          }
          introduction
        }
      }
    }
  }
`;

const styles = StyleSheet.create({
  buttonText: {
    color: color.WHITE,
  },
  greeting: {
    fontSize: fontSize.lessonTitle,
  },
  greetingName: {
    fontSize: fontSize.lessonTitle,
    fontWeight: "bold",
  },
  greetingWrapper: {
    paddingBottom: 36,
    paddingLeft: 16,
    paddingTop: 40,
  },
  learnScreenWrapper: {
    alignItems: "stretch",
    backgroundColor: color.WHITE,
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  root: {
    backgroundColor: color.WHITE,
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
  userGivenName: string,
|};

const getGreeting = () => {
  const hours = new Date().getHours();
  if (hours >= 4 && hours < 11) {
    return ["おはよう", "Good morning,"];
  } else if (hours >= 11 && hours < 5) {
    return ["こんにちは", "Hello,"];
  } else {
    return ["こんばんは", "Good evening,"];
  }
};

export function LearnScreen(props: Props): Node {
  const [loading, setLoading] = useState(false);

  props.navigation.setOptions({
    headerShown: false,
  });

  const startLesson = () => {
    setLoading(true);

    client
      .query({
        query: NEXT_LESSON_QUERY,
        fetchPolicy: "network-only",
        variables: {
          email: props.userEmail,
        },
      })
      .then((result) => {
        console.log(result);
        setLoading(false);
        props.navigation.push("Lesson", {
          lesson: result.data.user.nextLesson,
          userId: result.data.user.id,
        });
        return result;
      });
  };

  const [japaneseGreeting, englishGreeting] = getGreeting();

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.learnScreenWrapper}>
        <View style={styles.greetingWrapper}>
          <Text style={styles.greeting}>{englishGreeting}</Text>
          <Text style={styles.greetingName}>{props.userGivenName}</Text>
        </View>
        <SideSlider
          heading="Intro to Japanese"
          linkCardProps={[
            {
              bigText: "Next Hiragana Lesson",
              smallText: "5 min・Beginner",
              blockOut: false,
              onPress: startLesson,
            },
            {
              bigText: "Next Hiragana Lesson",
              smallText: "5 min・Beginner",
              disabled: true,
              blockOut: false,
              onPress: startLesson,
            },
          ]}
        />
        <SideSlider
          heading="Unlocked after Hiragana"
          linkCardProps={[
            {
              bigText: "Next Hiragana Lesson",
              smallText: "5 min・Beginner",
              disabled: true,
              blockOut: false,
              onPress: startLesson,
            },
            {
              bigText: "Next Hiragana Lesson",
              smallText: "5 min・Beginner",
              disabled: true,
              blockOut: false,
              onPress: startLesson,
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
