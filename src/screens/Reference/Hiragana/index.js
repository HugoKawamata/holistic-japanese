// @flow
import React, { useState, type Node, createRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  FlatList,
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
} from "./util";
import styles from "./style";

type Props = {|
  navigation: any,
|};

export function HiraganaReferenceScreen(props: Props) {
  const kanaLevelValue = kanaLevelToIntMap["hiragana-a"];
  const { width } = Dimensions.get("window");

  const getHiraganaPage = (kanaMatrix, romajiMatrix) => (
    <View style={styles.hiraganaReferenceScreenWrapper}>
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
              const complete = rowNum + 1 <= kanaLevelValue;

              console.log(colNum, kana);
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
    </View>
  );

  const hiraganaPage = getHiraganaPage(hiraganaMatrix, hiraganaRomajiMatrix);
  const voicedHiraganaPage = getHiraganaPage(
    voicedHiraganaMatrix,
    voicedHiraganaRomajiMatrix
  );
  const comboPage = getHiraganaPage(comboMatrix, comboRomajiMatrix);

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
