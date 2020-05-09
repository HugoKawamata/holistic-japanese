/* @flow */
import React, { useState } from "react";
import { View, FlatList, ScrollView, Dimensions } from "react-native";
import { connect } from "react-redux";
import { gql } from "apollo-boost";
import { Query as ApolloQuery } from "@apollo/react-components";
import { type State as StoreState } from "../../../store/types/store";
import { OverlayModal } from "../../../components/OverlayModal";
import Text from "../../../components/Text";
import type {
  LessonContent,
  NextLesson_user_nextLesson_testables as Testable,
} from "../../Learn/__generated__/NextLesson";
import type { Results } from "../../Lesson/types";
import {
  kanaLevelToIntMap,
  hiraganaMatrix,
  hiraganaRomajiMatrix,
  voicedHiraganaMatrix,
  voicedHiraganaRomajiMatrix,
  comboMatrix,
  comboRomajiMatrix,
  columnLeadToKanaLevelMap,
  getModalContent,
} from "./util";
import type { KanaLevelQuery as TKanaLevelQuery } from "./__generated__/KanaLevelQuery";
import styles from "./style";

type OwnProps = {|
  route: {
    params: any, // eslint-disable-line flowtype/no-weak-types
  },
|};

type Props = {|
  ...OwnProps,
  completedContent: ?LessonContent,
  results: Results,
  testables: $ReadOnlyArray<Testable>,
  modalOpen: boolean,
|};

const KANA_LEVEL_QUERY = gql`
  query KanaLevelQuery {
    me {
      kanaLevel
    }
  }
`;

const KanaLevelQuery: ApolloQuery<TKanaLevelQuery, {}> = ApolloQuery;

export function HiraganaReferenceScreen(props: Props) {
  const { modalOpen, completedContent, results, testables } = props;
  const [modalVisible, setModalVisible] = useState(modalOpen);

  const { width } = Dimensions.get("window");

  const getHiraganaPage = (kanaMatrix, romajiMatrix, title) => (
    <KanaLevelQuery query={KANA_LEVEL_QUERY} fetchPolicy="cache-and-network">
      {({ loading, data, error }) => {
        if (loading && (!data || Object.keys(data).length === 0)) {
          return null; // TODO: loading state
        }

        if (error != null || !data || !data.me) {
          return null; // TODO: error state
        }

        const kanaLevelValue = kanaLevelToIntMap[data.me.kanaLevel] || 0;

        return (
          <View style={styles.root}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.hiraganaReferenceScreenWrapper}
            >
              <View style={styles.title}>
                <Text style={styles.titleText}>{title}</Text>
              </View>
              <View style={styles.xAxisRow}>
                <View style={styles.xAxisLabel}>
                  <Text style={styles.xAxisText}>A</Text>
                </View>
                <View style={styles.xAxisLabel}>
                  <Text style={styles.xAxisText}>I</Text>
                </View>
                <View style={styles.xAxisLabel}>
                  <Text style={styles.xAxisText}>U</Text>
                </View>
                <View style={styles.xAxisLabel}>
                  <Text style={styles.xAxisText}>E</Text>
                </View>
                <View style={styles.xAxisLabel}>
                  <Text style={styles.xAxisText}>O</Text>
                </View>
              </View>
              <View style={styles.mainMatrixWrapper}>
                {kanaMatrix.map((row, rowNum) => (
                  <View style={styles.row} key={row[0]}>
                    {row.map((kana, colNum) => {
                      const complete =
                        columnLeadToKanaLevelMap[kanaMatrix[rowNum][1]] <=
                        kanaLevelValue;

                      if (colNum === 0) {
                        return (
                          <View style={styles.yAxisLabel}>
                            <Text style={styles.yAxisText}>{kana}</Text>
                          </View>
                        );
                      }

                      return kana === "" ? (
                        <View style={styles.nullCell} />
                      ) : (
                        <View
                          style={
                            complete
                              ? styles.completeCell
                              : styles.incompleteCell
                          }
                        >
                          <Text
                            style={
                              complete
                                ? styles.completeCellKana
                                : styles.incompleteCellKana
                            }
                          >
                            {kana}
                          </Text>
                          <Text
                            style={
                              complete
                                ? styles.completeCellRomaji
                                : styles.incompleteCellRomaji
                            }
                          >
                            {romajiMatrix[rowNum][colNum - 1]}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        );
      }}
    </KanaLevelQuery>
  );

  const hiraganaPage = getHiraganaPage(
    hiraganaMatrix,
    hiraganaRomajiMatrix,
    "Regular Hiragana"
  );
  const voicedHiraganaPage = getHiraganaPage(
    voicedHiraganaMatrix,
    voicedHiraganaRomajiMatrix,
    "Voiced Hiragana"
  );
  const comboPage = getHiraganaPage(
    comboMatrix,
    comboRomajiMatrix,
    "Combo Hiragana"
  );

  const pages = [hiraganaPage, voicedHiraganaPage, comboPage];
  const pageNumbers = [0, 1, 2];

  return (
    // TODO: This probably needs to be a scrollview
    <>
      <FlatList
        style={styles.list}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        scrollEventThrottle={16} // 60fps
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={0}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => pages[item]}
        data={pageNumbers}
      />
      <OverlayModal
        closeModal={() => setModalVisible(false)}
        title={<Text style={styles.modalTitle}>Congratulations!</Text>}
        visible={modalVisible}
      >
        {getModalContent(completedContent, results, testables, () =>
          setModalVisible(false)
        )}
      </OverlayModal>
    </>
  );
}

function mapStateToProps(state: StoreState, ownProps: OwnProps) {
  return {
    ...ownProps,
    completedContent: ownProps.route?.params?.completedContent || null,
    results: ownProps.route?.params?.results || null,
    testables: ownProps.route?.params?.testables || null,
    modalOpen: ownProps.route?.params?.modalOpen || false,
  };
}

export default connect(mapStateToProps)(HiraganaReferenceScreen);
