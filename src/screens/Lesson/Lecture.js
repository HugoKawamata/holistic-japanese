// @flow

import React from "react";
import { View, Image } from "react-native";
import Text from "../../components/Text";
import FuriganaText from "../../components/Text/FuriganaText";
import Button from "../../components/Button";
import type { NextLesson_user_nextLesson_lectures as Lecture } from "../Learn/__generated__/NextLesson";
import styles from "./styles";

type Props = {|
  lecture: $ReadOnlyArray<Lecture>,
  setLecture: (any) => typeof undefined,
|};

export function LectureScreen(props: Props) {
  const currentLecture = props.lecture[0];
  console.log(props);
  return (
    <View style={styles.lectureScreenWrapper}>
      <View style={styles.bottomSection}>
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
        <View style={styles.hintSection}>
          <View style={styles.hintBox}>
            <Text style={styles.hint}>{currentLecture.text}</Text>
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            theme="primary"
            onPress={() => props.setLecture(props.lecture.slice(1))}
          >
            <FuriganaText
              furiStyle={styles.buttonText}
              textStyle={styles.buttonText}
              kana="つぎへ"
              text="次へ"
            />
            <Text style={styles.buttonText}>Next</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

export default LectureScreen;
