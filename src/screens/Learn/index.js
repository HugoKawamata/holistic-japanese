/* @flow */
import React, { type Node } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { gql } from "apollo-boost";
import { Query as ApolloQuery } from "@apollo/react-components";
import type { State as StoreState } from "../../store/types/store";
import client from "../../apollo";
import Text from "../../components/Text";
import Button from "../../components/Button";
import SideSlider from "../../components/SideSlider";
import color from "../../util/color";
import { fontSize } from "../../util/font";
import FuriganaText from "../../components/Text/FuriganaText";
import type {
  AvailableLessons as TAvailableLessonsQuery,
  AvailableLessons_user_availableCourses_availableLessons as Lesson,
} from "./__generated__/AvailableLessons";

const AVAILABLE_LESSONS_QUERY = gql`
  query AvailableLessons($email: String!) {
    user(email: $email) {
      id
      availableCourses {
        id
        title
        availableLessons {
          id
          lectures {
            title
            text
            image
            position
          }
          title
          image
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
  }
`;

const AvailableLessonsQuery: ApolloQuery<
  TAvailableLessonsQuery,
  {}
> = ApolloQuery;

const styles = StyleSheet.create({
  buttonText: {
    color: color.TEXT_P,
  },
  buttonWrapper: {
    alignItems: "center",
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

const allLessons = () => {};

export function LearnScreen(props: Props): Node {
  const { navigation, userGivenName, userEmail } = props;
  navigation.setOptions({
    headerShown: false,
  });

  const startLesson = (userId: string, lesson: Lesson) => {
    client
      .query({
        query: AVAILABLE_LESSONS_QUERY,
        fetchPolicy: "network-only",
        variables: {
          email: props.userEmail,
        },
      })
      .then((result) => {
        props.navigation.push("Lesson", {
          lesson,
          userId,
        });
        return result;
      });
  };

  const [, englishGreeting] = getGreeting();

  return (
    <AvailableLessonsQuery
      query={AVAILABLE_LESSONS_QUERY}
      variables={{ email: userEmail }}
      fetchPolicy="cache-and-network"
    >
      {({ loading, data, error }) => {
        if (loading && (!data || Object.keys(data).length === 0)) {
          return null; // TODO: loading state
        }

        if (
          error != null ||
          !data ||
          !data.user ||
          !data.user.availableCourses
        ) {
          return null; // TODO: error state
        }

        const { user } = data;
        const courses = data.user.availableCourses;

        return (
          <View style={styles.root}>
            <ScrollView contentContainerStyle={styles.learnScreenWrapper}>
              <View style={styles.greetingWrapper}>
                <Text style={styles.greeting}>{englishGreeting}</Text>
                <Text style={styles.greetingName}>{userGivenName}</Text>
              </View>
              {courses.map((course) => {
                return (
                  <SideSlider
                    key={course.id}
                    heading={course.title}
                    linkCardProps={course.availableLessons.map((lesson) => ({
                      key: lesson.id,
                      bigText: lesson.title,
                      smallText: "5 min・Beginner",
                      onPress: () => startLesson(user.id, lesson),
                    }))}
                  />
                );
              })}
              <View style={styles.buttonWrapper}>
                <Button theme="primary_ghost" onPress={allLessons}>
                  <FuriganaText
                    textStyle={styles.buttonText}
                    furiStyle={styles.buttonText}
                    kana="すべてかんせいしたレッスン"
                    text="すべて完成したレッスン"
                  />
                  <Text style={styles.buttonText}>All Completed Lessons</Text>
                </Button>
              </View>
            </ScrollView>
          </View>
        );
      }}
    </AvailableLessonsQuery>
  );
}

function mapStateToProps(state: StoreState) {
  return {
    userEmail: state.user.user?.email,
    userGivenName: state.user.user?.givenName,
  };
}

export default connect(mapStateToProps)(LearnScreen);
