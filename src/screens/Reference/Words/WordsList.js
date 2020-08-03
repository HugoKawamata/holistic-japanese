/* @flow */

import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { type State as StoreState } from "../../../store/types/store";
import Text from "../../../components/Text";
import FuriganaText from "../../../components/Text/FuriganaText";
import color from "../../../util/color";
import { fontSize } from "../../../util/font";
import { isAllKana } from "../../../util/helpers/text";
import type { WordCategoriesQuery_me_availableCourses_learnedWords as Word } from "./__generated__/WordCategoriesQuery";

const wordWrapperShared = {
  flexDirection: "row",
  paddingVertical: 10,
  paddingHorizontal: 20,
};

const styles = StyleSheet.create({
  bottomSectionText: {
    color: color.TEXT,
  },
  emojiText: {
    fontSize: fontSize.veryLarge,
  },
  root: {
    backgroundColor: color.WHITE,
    flexGrow: 1,
  },
  topSectionText: {
    fontSize: fontSize.title,
    fontWeight: "bold",
    color: color.TEXT,
  },
  wordBody: {},
  wordEmoji: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 20,
  },
  wordTopSection: {
    alignItems: "flex-end",
    flexDirection: "row",
  },
  wordWrapperEven: {
    ...wordWrapperShared,
  },
  wordWrapperOdd: {
    ...wordWrapperShared,
    backgroundColor: color.HINT_BG,
  },
  wordsList: {},
});

type OwnProps = {|
  route: {
    params: {
      words: Array<Word>,
    },
  },
|};

type Props = {|
  ...OwnProps,
  words: Array<Word>,
|};

export function WordsList(props: Props) {
  const { words } = props;
  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wordsList}
      >
        {words
          .filter(
            (word) =>
              word.hiragana && word.japanese && word.english && word.emoji
          )
          .map((word, i) => {
            return (
              <View
                key={word.japanese}
                style={styles[`wordWrapper${i % 2 === 1 ? "Odd" : "Even"}`]}
              >
                <View style={styles.wordEmoji}>
                  <Text style={styles.emojiText}>{word.emoji || ""}</Text>
                </View>
                <View style={styles.wordBody}>
                  <View style={styles.wordTopSection}>
                    <Text style={styles.topSectionText}>
                      {`${word.hiragana || ""}`}
                    </Text>
                    {isAllKana(word.japanese || "") ? null : (
                      <FuriganaText
                        kana={`・${word.hiragana || ""}`}
                        text={`・${word.japanese || ""}`}
                        textStyle={styles.topSectionText}
                      />
                    )}
                  </View>
                  <View>
                    <Text style={styles.bottomSectionText}>
                      {word.english || ""}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}

function mapStateToProps(state: StoreState, ownProps: OwnProps) {
  return {
    words: ownProps.route?.params?.words || null,
  };
}

export default connect(mapStateToProps)(WordsList);
