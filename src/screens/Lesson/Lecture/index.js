/* @flow */

import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import Text from "../../../components/Text";
import Icon from "../../../components/Icon";
import FuriganaText from "../../../components/Text/FuriganaText";
import TransformText from "../../../components/Text/TransformText";
import Button from "../../../components/Button";
import color from "../../../util/color";
import type { AvailableLessons_me_availableCourses_availableLessons_lectures as Lecture } from "../../Learn/__generated__/AvailableLessons";
import type { LecturesStatus } from "..";
import { sharedStyles } from "../styles";
import styles from "./styles";

type Props = {|
  lectures: $ReadOnlyArray<Lecture>,
  lectureIndex: number,
  setLecturesStatus: (LecturesStatus) => typeof undefined,
  setLectureIndex: (number) => void,
  setExitModalVisible: (boolean) => void,
|};

export function LectureScreen(props: Props) {
  const { lectures, lectureIndex, setExitModalVisible } = props;
  const currentLecture = lectures[lectureIndex];
  return (
    <>
      <View style={styles.lectureScreenWrapper}>
        <TouchableOpacity
          style={styles.exitWrapper}
          onPress={() => {
            setExitModalVisible(true);
          }}
        >
          <Icon color={color.TEXT} name="keyboard-return" size={32} />
        </TouchableOpacity>
        <View style={sharedStyles.bottomSection}>
          {currentLecture.title == null ? null : (
            <Text style={styles.lectureTitle}>{currentLecture.title}</Text>
          )}
          <View style={styles.lectureImageWrapper}>
            <Image
              style={styles.lectureImage}
              source={{ uri: currentLecture.image }}
              resizeMode="contain"
            />
          </View>
          <View style={sharedStyles.hintSection}>
            <View style={sharedStyles.hintBox}>
              <TransformText style={sharedStyles.hint}>
                {currentLecture.text}
              </TransformText>
            </View>
          </View>
          <View style={styles.lectureButtonSection}>
            {lectureIndex > 0 && (
              <View style={styles.lectureBackButtonWrapper}>
                <Button
                  theme="primary_ghost"
                  onPress={() => props.setLectureIndex(lectureIndex - 1)}
                >
                  <FuriganaText
                    furiStyle={styles.redButtonText}
                    textStyle={styles.redButtonText}
                    kana="もどる"
                    text="戻る"
                  />
                  <Text style={styles.redButtonText}>Back</Text>
                </Button>
              </View>
            )}
            <View style={lectureIndex > 0 && styles.lectureNextButtonWrapper}>
              <Button
                theme="primary"
                onPress={
                  lectureIndex + 1 === lectures.length
                    ? () => props.setLecturesStatus("undoable")
                    : () => props.setLectureIndex(lectureIndex + 1)
                }
              >
                <FuriganaText
                  furiStyle={sharedStyles.buttonText}
                  textStyle={sharedStyles.buttonText}
                  kana="つぎへ"
                  text="次へ"
                />
                <Text style={sharedStyles.buttonText}>Next</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

export default LectureScreen;
