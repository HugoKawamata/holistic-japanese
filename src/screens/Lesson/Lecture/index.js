/* @flow */

import React from "react";
import { View, Image } from "react-native";
import Text from "../../../components/Text";
import FuriganaText from "../../../components/Text/FuriganaText";
import TransformText from "../../../components/Text/TransformText";
import Button from "../../../components/Button";
import type { AvailableLessons_user_availableCourses_availableLessons_lectures as Lecture } from "../../Learn/__generated__/AvailableLessons";
import { sharedStyles } from "../styles";
import styles from "./styles";

type Props = {|
  lecture: $ReadOnlyArray<Lecture>,
  setLecture: ($ReadOnlyArray<Lecture>) => typeof undefined,
|};

export function LectureScreen(props: Props) {
  const { lecture } = props;
  const currentLecture = lecture[0];
  return (
    <View style={styles.lectureScreenWrapper}>
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
        <View style={sharedStyles.buttonWrapper}>
          <Button
            theme="primary"
            onPress={() => props.setLecture(lecture.slice(1))}
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
  );
}

export default LectureScreen;
