/* @flow */
import React, { type Node } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { gql } from "apollo-boost";
import { connect } from "react-redux";
import { Query as ApolloQuery } from "@apollo/react-components";
import type { State as StoreState } from "../../store/types/store";
import SideSlider from "../../components/SideSlider";
import Text from "../../components/Text";
import color from "../../util/color";
import { fontSize } from "../../util/font";
import type {
  CompletedLessons as TCompletedLessonsQuery,
  CompletedLessons_user_completedCourses_lessons as Lesson,
} from "./__generated__/CompletedLessons";

const COMPLETED_LESSONS_QUERY = gql`
  query CompletedLessons {
    me {
      id
      completedCourses {
        id
        title
        lessons {
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
      availableCourses {
        id
        title
        completedLessons {
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

const CompletedLessonsQuery: ApolloQuery<
  TCompletedLessonsQuery,
  {}
> = ApolloQuery;

const styles = StyleSheet.create({
  buttonText: {
    color: color.WHITE,
  },
  buttonWrapper: {
    alignItems: "center",
  },
  heading: {
    fontSize: fontSize.lessonTitle,
    fontWeight: "bold",
  },
  headingWrapper: {
    paddingBottom: 36,
    paddingLeft: 16,
    paddingTop: 40,
  },
  completedLessonsScreenWrapper: {
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
|};

export function CompletedLessonsScreen(props: Props): Node {
  const { userEmail } = props;

  const startLesson = (userId: string, lesson: Lesson) => {
    props.navigation.push("Lesson", {
      lesson,
      userId,
    });
  };

  return (
    <CompletedLessonsQuery
      query={COMPLETED_LESSONS_QUERY}
      variables={{ email: userEmail }}
      fetchPolicy="network-only"
    >
      {({ loading, data, error }) => {
        if (loading && (!data || Object.keys(data).length === 0)) {
          return null; // TODO: loading state
        }

        if (error != null || !data || !data.me || !data.me.availableCourses) {
          return null; // TODO: error state
        }

        const { me } = data;
        const { availableCourses, completedCourses } = data.me;

        return (
          <View style={styles.root}>
            <ScrollView
              contentContainerStyle={styles.completedLessonsScreenWrapper}
            >
              <View style={styles.headingWrapper}>
                <Text style={styles.heading}>All Completed Lessons</Text>
              </View>
              {availableCourses.map((course) => {
                return (
                  <SideSlider
                    key={course.id}
                    heading={course.title}
                    linkCardProps={course.completedLessons.map((lesson) => ({
                      key: lesson.id,
                      bigText: lesson.title,
                      smallText: "5 min・Beginner",
                      onPress: () => startLesson(me.id, lesson),
                    }))}
                  />
                );
              })}
              {(completedCourses || []).map((course) => {
                return (
                  <SideSlider
                    key={course.id}
                    heading={course.title}
                    linkCardProps={course.lessons.map((lesson) => ({
                      key: lesson.id,
                      bigText: lesson.title,
                      smallText: "5 min・Beginner",
                      onPress: () => {},
                    }))}
                  />
                );
              })}
            </ScrollView>
          </View>
        );
      }}
    </CompletedLessonsQuery>
  );
}

function mapStateToProps(state: StoreState) {
  return {
    userEmail: state.user.user?.email,
  };
}

export default connect(mapStateToProps)(CompletedLessonsScreen);
