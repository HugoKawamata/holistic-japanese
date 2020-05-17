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
      nextUnlockCourses {
        id
        title
        lessons {
          id
          title
          image
        }
      }
      availableCourses {
        id
        title
        nextUnlockLessons {
          id
          title
          image
        }
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
    color: color.WHITE,
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
    paddingBottom: 30,
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
      fetchPolicy="network-only"
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
        const { nextUnlockCourses } = data.user;

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
                    linkCardProps={course.availableLessons
                      .map((lesson) => ({
                        key: lesson.id,
                        bigText: lesson.title,
                        smallText: "5 min・Beginner",
                        onPress: () => startLesson(user.id, lesson),
                      }))
                      .concat(
                        course.nextUnlockLessons.map((lesson) => ({
                          key: lesson.id,
                          bigText: lesson.title,
                          smallText: "Locked",
                          onPress: () => {},
                          disabled: true,
                        }))
                      )}
                  />
                );
              })}
              {nextUnlockCourses.map((course) => {
                return (
                  <SideSlider
                    key={course.id}
                    heading={course.title}
                    linkCardProps={course.lessons.map((lesson) => ({
                      key: lesson.id,
                      bigText: lesson.title,
                      smallText: "Locked",
                      onPress: () => {},
                      disabled: true,
                    }))}
                  />
                );
              })}
              <View style={styles.buttonWrapper}>
                <Button theme="tertiary" onPress={allLessons}>
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
