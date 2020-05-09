/* @flow */
import React, { useState, type Node } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { gql } from "apollo-boost";
import type { State as StoreState } from "../../store/types/store";
import client from "../../apollo";
import Text from "../../components/Text";
import SideSlider from "../../components/SideSlider";
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
  userEmail: string,
  userGivenName: string,
|};

const getGreeting = () => {
  const hours = new Date().getHours();
  if (hours >= 4 && hours < 11) {
    return ["おはよう", "Good morning,"];
  }
  if (hours >= 11 && hours < 5) {
    return ["こんにちは", "Hello,"];
  }
  return ["こんばんは", "Good evening,"];
};

export function LearnScreen(props: Props): Node {
  const [loading, setLoading] = useState(false);

  const { navigation, userGivenName } = props;
  navigation.setOptions({
    headerShown: false,
  });

  const startLesson = () => {
    if (loading) {
      return;
    }

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
        setLoading(false);
        props.navigation.push("Lesson", {
          lesson: result.data.user.nextLesson,
          userId: result.data.user.id,
        });
        return result;
      });
  };

  const [, englishGreeting] = getGreeting();

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.learnScreenWrapper}>
        <View style={styles.greetingWrapper}>
          <Text style={styles.greeting}>{englishGreeting}</Text>
          <Text style={styles.greetingName}>{userGivenName}</Text>
        </View>
        <SideSlider
          heading="Intro to Japanese"
          linkCardProps={[
            {
              key: "1",
              bigText: "Next Hiragana Lesson",
              smallText: "5 min・Beginner",
              onPress: startLesson,
            },
            {
              key: "2",
              bigText: "Next Hiragana Lesson",
              smallText: "5 min・Beginner",
              disabled: true,
              onPress: startLesson,
            },
          ]}
        />
        <SideSlider
          heading="Unlocked after Hiragana"
          linkCardProps={[
            {
              key: "3",
              bigText: "Next Hiragana Lesson",
              smallText: "5 min・Beginner",
              disabled: true,
              onPress: startLesson,
            },
            {
              key: "4",
              bigText: "Next Hiragana Lesson",
              smallText: "5 min・Beginner",
              disabled: true,
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
