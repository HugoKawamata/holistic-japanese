/* @flow */

import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { gql } from "apollo-boost";
import { Query as ApolloQuery } from "@apollo/react-components";
import color from "../../../util/color";
import { fontSize } from "../../../util/font";
import BarLink from "../../../components/BarLink";
import NumberBubble from "../../../components/NumberBubble";
import Text from "../../../components/Text";
import type { WordCategoriesQuery as TWordCategoriesQuery } from "./__generated__/WordCategoriesQuery";

const WORD_CATEGORIES_QUERY = gql`
  query WordCategoriesQuery {
    me {
      availableCourses {
        id
        title
        learnedWords {
          id
          japanese
          hiragana
          english
          emoji
        }
      }
      completedCourses {
        id
        title
        learnedWords {
          id
          japanese
          hiragana
          english
          emoji
        }
      }
    }
  }
`;

const styles = StyleSheet.create({
  courseList: {},
  heading: {
    fontSize: fontSize.lessonTitle,
    fontWeight: "bold",
  },
  headingWrapper: {
    paddingBottom: 36,
    paddingLeft: 16,
  },
  root: {
    backgroundColor: color.WHITE,
    flexGrow: 1,
  },
  wordsReferenceScreenWrapper: {
    // alignItems: "center",
    backgroundColor: color.WHITE,
  },
});

const WordCategoriesQuery: ApolloQuery<TWordCategoriesQuery, {}> = ApolloQuery;

type Props = {|
  navigation: any, // eslint-disable-line flowtype/no-weak-types
|};

export function WordsReferenceScreen(props: Props) {
  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wordsReferenceScreenWrapper}
      >
        <View style={styles.headingWrapper}>
          <Text style={styles.heading}>Words</Text>
        </View>
        <WordCategoriesQuery
          query={WORD_CATEGORIES_QUERY}
          fetchPolicy="no-cache"
        >
          {({ loading, data, error }) => {
            if (loading && (!data || Object.keys(data).length === 0)) {
              // TODO: loading
            }

            if (error != null || !data || !data.me) {
              // TODO: error
              return null;
            }

            const courses = data.me.availableCourses.concat(
              data.me.completedCourses
            );

            return (
              <View style={styles.courseList}>
                <BarLink
                  leftNode={
                    <NumberBubble
                      number={courses.reduce(
                        (acc, cur) => acc + cur.learnedWords.length,
                        0
                      )}
                    />
                  }
                  text="All Words"
                  onPress={() => {}}
                />
                {courses.map((course) => (
                  <BarLink
                    key={course.id}
                    leftNode={
                      <NumberBubble number={course.learnedWords.length} />
                    }
                    text={course.title}
                    onPress={() =>
                      props.navigation.push("WordsList", {
                        words: course.learnedWords,
                      })
                    }
                  />
                ))}
              </View>
            );
          }}
        </WordCategoriesQuery>
      </ScrollView>
    </View>
  );
}

export default WordsReferenceScreen;
