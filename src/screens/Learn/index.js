/* @flow */
import React, { type Node } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { Duration } from "luxon";
import { gql } from "apollo-boost";
import { Query as ApolloQuery } from "@apollo/react-components";
import type { State as StoreState } from "../../store/types/store";
import Text from "../../components/Text";
import Button from "../../components/Button";
import SideSlider from "../../components/SideSlider";
import color from "../../util/color";
import { fontSize } from "../../util/font";
import type {
  AvailableLessons as TAvailableLessonsQuery,
  AvailableLessons_user_availableCourses_availableLessons as Lesson,
  AvailableLessons_user_splots as Splots,
} from "./__generated__/AvailableLessons";

const AVAILABLE_LESSONS_QUERY = gql`
  query AvailableLessons {
    me {
      id
      createdAt
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
          skillLevel
          timeEstimate
          testables {
            objectId
            objectType
            wordId
            orderInLesson
            context {
              person
              location
              speaker
              japanese
              furigana
              english
            }
            question {
              type
              emoji
              image
              text
              furigana
              prompt
            }
            answer {
              type
              text
            }
            introduction
          }
        }
      }
      splots {
        me
        meFuri
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

export function LearnScreen(props: Props): Node {
  const { navigation, userGivenName, userEmail } = props;
  navigation.setOptions({
    headerShown: false,
  });

  const allLessons = () => {
    props.navigation.push("Completed Lessons");
  };

  const startLesson = (
    userId: string,
    lesson: Lesson,
    refetch: () => {},
    splots: Splots
  ) => {
    props.navigation.push("Lesson", {
      lesson,
      userId,
      refetch,
      splots,
    });
  };

  const [, englishGreeting] = getGreeting();

  return (
    <AvailableLessonsQuery
      query={AVAILABLE_LESSONS_QUERY}
      variables={{ email: userEmail }}
      fetchPolicy="network-only"
    >
      {({ loading, data, error, refetch }) => {
        if (loading && (!data || Object.keys(data).length === 0)) {
          return null; // TODO: loading state
        }

        if (error != null || !data || !data.me || !data.me.availableCourses) {
          return null; // TODO: error state
        }

        const { me } = data;
        const courses = data.me.availableCourses;
        const { nextUnlockCourses } = data.me;

        // If the me was created less than 5 minutes ago, show the introduction
        if (+new Date() - me.createdAt < 60 * 1000 * 5) {
          props.navigation.push("Introduction");
        }

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
                        smallText: `${Duration.fromMillis(
                          lesson.timeEstimate * 1000
                        ).toFormat("m 'min'")}・${lesson.skillLevel}`,
                        onPress: () =>
                          startLesson(me.id, lesson, refetch, me.splots),
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
