/* @flow */
import React, { type Node } from "react";
import { View, TouchableOpacity, Image, ImageBackground } from "react-native";
import Text from "../../../components/Text";
import FuriganaText from "../../../components/Text/FuriganaText";
import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
import color from "../../../util/color";
import { addSplotsToText } from "../../../util/helpers/text";
import type {
  AvailableLessons_me_availableCourses_availableLessons_testables as Testable,
  AvailableLessons_me_splots as Splots,
} from "../../Learn/__generated__/AvailableLessons";
import { getCSVAnswer } from "../util";
import type { UserAnswer } from "../types";
import type { LecturesStatus } from "..";
import { sharedStyles } from "../styles";
import styles from "./styles";

export const getPersonImage = (personName: string) => {
  // for placeholders, use same image for all values of a single person.
  const [person] = personName.split("_");
  switch (person) {
    case "YUJI": {
      return require(`../../../../assets/images/people/yuji_placeholder.png`);
    }
    case "CHIEKO": {
      return require(`../../../../assets/images/people/chieko_placeholder.png`);
    }
    case "MARI": {
      return require(`../../../../assets/images/people/mari_placeholder.png`);
    }
    case "HINAKO": {
      return require(`../../../../assets/images/people/hinako_placeholder.png`);
    }
    default: {
      return null;
    }
  }
};

export const getBackgroundImage = (location: ?string) => {
  switch (location) {
    case "TRAIN_STATION": {
      return require(`../../../../assets/images/locations/TRAIN_STATION.jpg`);
    }
    case "RESTAURANT": {
      return require(`../../../../assets/images/locations/RESTAURANT.jpg`);
    }
    case "AIRPORT": {
      return require(`../../../../assets/images/locations/AIRPORT.jpg`);
    }
    case "HOSTEL_LOBBY": {
      return require(`../../../../assets/images/locations/HOSTEL_LOBBY.jpg`);
    }
    case "TOKYO_STREET": {
      return require(`../../../../assets/images/locations/TOKYO_STREET.jpg`);
    }
    default: {
      return require("../../../../assets/images/akiba.jpg");
    }
  }
};

export const getTopSectionContent = (
  currentTestable: Testable,
  lecturesStatus: LecturesStatus,
  setExitModalVisible: (boolean) => void,
  setLecturesStatus: (LecturesStatus) => typeof undefined
) => {
  const hasJapanese =
    currentTestable.context?.japanese != null &&
    currentTestable.context?.japanese !== "";

  return (
    <>
      <TouchableOpacity
        style={styles.exitWrapper}
        onPress={() => {
          if (lecturesStatus === "undoable") {
            setLecturesStatus("active");
          } else {
            setExitModalVisible(true);
          }
        }}
      >
        <Icon color={color.WHITE} name="keyboard-return" size={32} />
      </TouchableOpacity>
      <ImageBackground
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImage}
        source={getBackgroundImage(currentTestable.context?.location)}
      >
        {currentTestable.context?.japanese == null &&
        currentTestable.context?.english == null ? null : (
          <View style={styles.contextWrapper}>
            <View style={styles.contextBubbleWrapper}>
              <View style={styles.speakerNameWrapper}>
                <Text style={styles.speakerName}>
                  {currentTestable.context?.speaker || ""}
                </Text>
              </View>
              <View style={styles.contextBubble}>
                {hasJapanese ? (
                  <FuriganaText
                    textStyle={styles.contextJapanese}
                    furiStyle={styles.contextFurigana}
                    text={currentTestable.context?.japanese || ""}
                    kana={currentTestable.context?.furigana || ""}
                  />
                ) : null}
                {/* If theres no japanese in the context, render the english as big as japanese normally is */}
                <Text
                  style={
                    hasJapanese ? styles.contextEnglish : styles.contextJapanese
                  }
                >
                  {currentTestable.context?.english || ""}
                </Text>
              </View>
            </View>
            {currentTestable.context?.person != null ? (
              <View style={styles.personWrapper}>
                <Image
                  // $FlowFuckOff We know this is a real string lmao
                  source={getPersonImage(currentTestable.context?.person || "")}
                  style={{ width: 60, height: 76 }}
                />
              </View>
            ) : null}
          </View>
        )}
        <View style={styles.bottomSectionTip} />
      </ImageBackground>
    </>
  );
};

export const getAnswerSection = (
  currentTestable: Testable,
  fields: Array<Node> | Node
) => {
  return <View style={styles.answerFieldWrapper}>{fields}</View>;
};

export const getButton = (
  currentMark: ?("CORRECT" | "INCORRECT"),
  userAnswer: UserAnswer,
  goToNextQuestion: () => void,
  answerRomajiQuestion: () => void
) => {
  if (currentMark === "CORRECT") {
    return (
      <Button theme="secondary" onPress={goToNextQuestion}>
        <Text style={sharedStyles.buttonText}>Correct!</Text>
      </Button>
    );
  }
  if (currentMark === "INCORRECT") {
    return (
      <Button theme="tertiary" onPress={goToNextQuestion}>
        <Text style={sharedStyles.buttonText}>Incorrect</Text>
      </Button>
    );
  }
  return (
    <Button
      theme="primary"
      onPress={answerRomajiQuestion}
      disabled={getCSVAnswer(userAnswer) === ""}
    >
      <Text style={sharedStyles.buttonText}>Answer</Text>
    </Button>
  );
};

export const getSentenceQuestion = (
  currentTestable: Testable,
  splots: Splots
) => {
  return (
    <View style={styles.sentenceQuestionWrapper}>
      <View style={sharedStyles.promptWrapper}>
        <Text style={sharedStyles.prompt}>
          {currentTestable.question?.prompt || ""}
        </Text>
      </View>
      <View style={styles.questionBubbleWrapper}>
        <View style={styles.questionBubble}>
          {currentTestable.question.furigana != null &&
          currentTestable.question.furigana !== "" ? (
            <FuriganaText
              text={currentTestable.question.text}
              kana={currentTestable.question.furigana}
              // textStyle={styles.questionBubbleText}
              // furiStyle={styles.questionBubbleFurigana}
            />
          ) : (
            <Text style={styles.questionBubbleText}>
              {addSplotsToText(currentTestable.question.text, splots)}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};
