// @flow
import React, { useState, type Node, createRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import Text from "../../../components/Text";
import Button from "../../../components/Button";
import {
  kanaLevelToIntMap,
  hiraganaMatrix,
  hiraganaRomajiMatrix,
  voicedHiraganaMatrix,
  voicedHiraganaRomajiMatrix,
  comboMatrix,
  comboRomajiMatrix,
  columnLeadToKanaLevelMap,
} from "./util";
import styles from "./style";

type Props = {|
  navigation: any,
|};

export function HiraganaReferenceScreen(props: Props) {
  const kanaLevelValue = kanaLevelToIntMap["HIRAGANA-A"];
  const { width } = Dimensions.get("window");

  const getHiraganaPage = (kanaMatrix, romajiMatrix, title) => (
    <ScrollView>
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
          <View style={styles.row}>
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

              return kana == "" ? (
                <View style={styles.nullCell} />
              ) : (
                <View
                  style={complete ? styles.completeCell : styles.incompleteCell}
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
      keyExtractor={(item) => item.toString()}
      renderItem={({ item }) => pages[item]}
      data={pageNumbers}
    />
  );
}

export default HiraganaReferenceScreen;
