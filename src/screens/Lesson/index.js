/* @flow */
import React, { useState, type Node, createRef, useEffect } from "react";
import {
  View,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { connect } from "react-redux";
import Sound from "react-native-sound";
import { type State as StoreState } from "../../store/types/store";
import Text from "../../components/Text";
import FuriganaText from "../../components/Text/FuriganaText";
import TransformText from "../../components/Text/TransformText";
import Button from "../../components/Button";
import OverlayModal from "../../components/OverlayModal";
import color from "../../util/color";
import { addSplotsToText } from "../../util/helpers/text";
import type {
  AvailableLessons_me_splots as Splots,
  AvailableLessons_me_availableCourses_availableLessons as Lesson,
  AvailableLessons_me_availableCourses_availableLessons_testables as Testable,
} from "../Learn/__generated__/AvailableLessons";
import {
  possibleSokuon,
  romajiHiraganaMap,
  formatResultsForMutation,
  getQuestionStage,
  getKeyForTestable,
  nChecker,
} from "./util";
import type { Results } from "./types";
import styles from "./styles";
import LectureScreen from "./Lecture";
import SentenceLesson from "./SentenceLesson";
import WordLesson from "./WordLesson";
// import ProgressBar from "./ProgressBar";

const SEND_RESULTS = gql`
  mutation sendResults(
    $results: [Result]!
    $userId: ID!
    $setLessonId: String!
  ) {
    addLessonResults(
      results: $results
      userId: $userId
      setLessonId: $setLessonId
    )
  }
`;

export type LecturesStatus = "active" | "inactive" | "undoable";

type OwnProps = {|
  navigation: any, // eslint-disable-line flowtype/no-weak-types
  route: {
    params: {
      lesson: Lesson,
      refetch: () => {},
      userId: string,
      splots: Splots,
    },
  },
|};

type Props = {|
  ...OwnProps,
  lesson: Lesson,
  refetch: () => {},
  splots: Splots,
  userId: string,
|};

const initResults = (testables: $ReadOnlyArray<Testable>) => {
  return testables.reduce((resultMap, testable) => {
    const testableResults = {
      answers: [],
      marks: [],
    };
    if (testable.objectType === "WORD") {
      return {
        ...resultMap,
        [testable.question.text]: testableResults,
      };
    }
    return {
      ...resultMap,
      [`testable-${testable.objectId}`]: testableResults,
    };
  }, {});
};

export const getBackgroundImage = (location: ?string) => {
  return location == null ? null : require("../../../assets/images/akiba.jpg");
};

export function LessonScreen(props: Props): Node {
  const { lesson, userId, navigation, splots } = props;
  const isKanaLesson = lesson.id !== "OTHER";
  navigation.setOptions({
    title: isKanaLesson ? "" : "レッスン・Lesson", // If kana lesson, we show the title in the topSection
    headerStyle: {
      backgroundColor: isKanaLesson ? color.KANA_Q_BG : color.NAVBAR,
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
      },
      elevation: 0,
    },
    headerTintColor: isKanaLesson ? color.WHITE : color.NAVBAR_TEXT,
    headerTitleStyle: {
      color: isKanaLesson ? color.WHITE : color.NAVBAR_TEXT,
    },
  });

  if (lesson.testables == null) {
    throw new Error("Lesson does not exist");
  }
  const testables = lesson.testables.filter(Boolean).sort((a, b) => {
    if (a.orderInLesson != null && b.orderInLesson != null) {
      if (a.orderInLesson < b.orderInLesson) {
        return -1;
      }
      if (a.orderInLesson > b.orderInLesson) {
        return 1;
      }
      return 0;
    }
    // If exactly one of the introductions is null, and this is a kana lesson.
    // This case is for sorting hetaWords to the back of the list, so as to
    // not interfere with midroll lectures
    if (
      ["HIRAGANA", "KATAKANA"].includes(lesson.id.slice(0, 8)) &&
      ((a.introduction != null && b.introduction == null) ||
        (a.introduction == null && b.introduction != null))
    ) {
      if (a.introduction == null) {
        return 1;
      }
      return -1;
    }
    if (a.objectId < b.objectId) {
      return -1;
    }
    if (a.objectId > b.objectId) {
      return 1;
    }
    return 0;
  });

  if (testables.length < 2) {
    throw new Error("Lesson is too short.");
  }

  const [unqueuedTestables, setUnqueuedTestables] = useState(
    testables.slice(2)
  );
  const [testableQueue, setTestableQueue] = useState(testables.slice(0, 2));

  const [lectures, setLectures] = useState(
    lesson.lectures != null
      ? lesson.lectures.filter((lec) => lec.position === "PRETEST")
      : []
  );

  // Store this instead of clearing lectures so that user can go back if they make a mistake
  const [lecturesStatus, setLecturesStatus] = useState("active"); // active/inactive/undoable

  const [lectureIndex, setLectureIndex] = useState(0);

  const [loading, setLoading] = useState(false);

  const [userAnswer, setUserAnswer] = useState({});

  const [results: Results, setResults] = useState(initResults(testables));

  const [currentMark, setCurrentMark] = useState(null); // Result is null if question not answered yet

  const [inputRefs, setInputRefs] = useState([]);

  const [exitModalVisible, setExitModalVisible] = useState(false);

  const [addLessonResults] = useMutation(SEND_RESULTS);

  useEffect(() => {
    setInputRefs((refs) =>
      Array(testableQueue[0].answer.text.split(",").length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [testableQueue[0]]);

  const currentTestable = testableQueue[0];

  const getAnswerFields = () => {
    const { answer } = currentTestable;
    switch (answer.type) {
      case "ROMAJI": {
        const answerParts = answer.text.split(",");

        const inputs = answerParts.map((charRomaji, i) => (
          <TextInput
            // eslint-disable-next-line react/no-array-index-key
            key={`${currentTestable.question.text}-${i}`}
            ref={inputRefs[i]}
            style={[
              styles.singleCharAnswerField,
              currentMark !== null && userAnswer[`input-${i}`] === charRomaji
                ? styles.correctAnswerField
                : null,
              currentMark !== null && userAnswer[`input-${i}`] !== charRomaji
                ? styles.incorrectAnswerField
                : null,
            ]}
            keyboardType={
              Platform.OS === "android" ? "visible-password" : "default"
            } // Prevents autocorrect on android
            autoCorrect={false}
            editable={
              currentMark == null || userAnswer[`input-${i}`] !== charRomaji
            }
            placeholder={romajiHiraganaMap[charRomaji] || "っ"}
            value={userAnswer[`input-${i}`]}
            onChangeText={(text) => {
              const lowerText = text.toLowerCase();
              if (
                Object.keys(romajiHiraganaMap).includes(lowerText) &&
                nChecker(lowerText, charRomaji)
              ) {
                const soundFile = `kana_${lowerText}.mp3`;
                const charSound = new Sound(
                  soundFile,
                  Sound.MAIN_BUNDLE,
                  (error) => {
                    if (error) {
                      // do something
                    }

                    // play when loaded
                    charSound.play();
                  }
                );
                charSound.release();
                // When text changes to a valid hiragana character's romaji, if this is the last input
                if (answerParts.length - 1 === i) {
                  // Blur self
                  inputRefs[i].current.blur();
                } else {
                  // Otherwise, focus the next one
                  inputRefs[i + 1].current.focus();
                }
              } else if (possibleSokuon.includes(charRomaji)) {
                // If this is the last input
                if (answerParts.length - 1 === i) {
                  // Blur self
                  inputRefs[i].current.blur();
                } else {
                  // Otherwise, focus the next one
                  inputRefs[i + 1].current.focus();
                }
              } else if (lowerText === "") {
                // User backspaced.
                // Do nothing for first input
                if (i !== 0) {
                  // Otherwise, focus the prev one
                  inputRefs[i - 1].current.focus();
                }
              }
              // $FlowFixMe Not sure what's happening here
              setUserAnswer({
                ...userAnswer,
                [`input-${i}`]: lowerText,
              });
            }}
          />
        ));

        const prevAnswers = results[currentTestable.question.text].answers;
        const prevMarks = results[currentTestable.question.text].marks;
        const prevMistake =
          prevAnswers.length > 0 &&
          prevMarks != null &&
          prevMarks.length > 0 &&
          prevMarks[prevMarks.length - 1] === "INCORRECT"
            ? prevAnswers[prevAnswers.length - 1].split(",")
            : null;

        return answerParts.map((charRomaji, i) => (
          /* eslint-disable-next-line react/no-array-index-key */
          <View key={`input-${i}`}>
            {inputs[i]}
            {prevMistake != null &&
            currentMark == null &&
            prevMistake[i] !== charRomaji ? (
              <Text style={styles.prevMistake}>{prevMistake[i]}</Text>
            ) : null}
            {currentMark === "INCORRECT" ? (
              <Text style={styles.correction}>{charRomaji}</Text>
            ) : null}
          </View>
        ));
      }
      case "JAPANESE": {
        const { displayAnswer } = currentTestable;

        return (
          <>
            <TextInput
              placeholder="Translate here"
              style={styles.regularAnswerField}
              value={userAnswer["input-0"]}
              onChangeText={(text) =>
                setUserAnswer({
                  "input-0": text,
                })
              }
            />
            {
              // eslint-disable-next-line no-nested-ternary
              currentMark !== "INCORRECT" ? null : displayAnswer.furigana ==
                null ? (
                <View style={styles.sentenceCorrectionWrapper}>
                  <TransformText style={styles.sentenceCorrection}>
                    {addSplotsToText(displayAnswer.text, splots)}
                  </TransformText>
                </View>
              ) : (
                <View style={styles.sentenceCorrectionWrapper}>
                  <FuriganaText
                    kana={addSplotsToText(displayAnswer.furigana, splots)}
                    text={addSplotsToText(displayAnswer.text, splots)}
                    textStyle={styles.sentenceCorrection}
                  />
                </View>
              )
            }
          </>
        );
      }
      case "ENGLISH":
      default: {
        const { displayAnswer } = currentTestable;

        return (
          <>
            <TextInput
              placeholder="Translate here"
              style={styles.regularAnswerField}
              value={userAnswer["input-0"]}
              onChangeText={(text) =>
                setUserAnswer({
                  "input-0": text,
                })
              }
            />
            {currentMark !== "INCORRECT" ? null : (
              <View style={styles.sentenceCorrectionWrapper}>
                <TransformText style={styles.sentenceCorrection}>
                  {addSplotsToText(displayAnswer.text, splots)}
                </TransformText>
              </View>
            )}
          </>
        );
      }
    }
  };

  const goToVictoryScreen = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const formattedResults = formatResultsForMutation(results);
    await addLessonResults({
      variables: {
        results: formattedResults,
        userId,
        setLessonId: lesson.id,
      },
    });
    props.refetch();
    setLoading(false);
    props.navigation.navigate("Learn");
    props.navigation.navigate("Hiragana", {
      completedContent: lesson.id,
      results,
      testables: lesson.testables,
      modalOpen: true,
    });
  };

  const showMidrollLecture = (nextTestable: Testable) => {
    const numUniqueQuestionsAnswered = Object.keys(results).filter(
      (key) =>
        results[key].objectType === "WORD" && results[key].marks.length > 0
    ).length;
    // Short circuit unless the current testable is one we haven't seen
    if (results[getKeyForTestable(nextTestable)].marks.length > 0) {
      return;
    }
    if (numUniqueQuestionsAnswered === 1) {
      setLectureIndex(0);
      setLectures(
        lesson.lectures != null
          ? lesson.lectures.filter((lec) => lec.position === "BEFORE_SECOND")
          : []
      );
      return;
    }
    if (numUniqueQuestionsAnswered === 2) {
      setLectureIndex(0);
      setLectures(
        lesson.lectures != null
          ? lesson.lectures.filter((lec) => lec.position === "BEFORE_THIRD")
          : []
      );
    }
    if (numUniqueQuestionsAnswered === 3) {
      setLectureIndex(0);
      setLectures(
        lesson.lectures != null
          ? lesson.lectures.filter((lec) => lec.position === "BEFORE_FOURTH")
          : []
      );
    }
  };

  const nextQuestion = (mark: ?("CORRECT" | "INCORRECT")) => {
    setLecturesStatus("inactive");

    // 0 if answered incorrectly
    const correctlyAnswered = mark === "CORRECT";

    // This is not the final question
    if (testableQueue.length > 1) {
      const nextTestable = testableQueue[1];

      if (!correctlyAnswered) {
        setTestableQueue([...testableQueue.slice(1), currentTestable]);
      } else {
        setTestableQueue(
          [
            ...testableQueue.slice(1),
            unqueuedTestables.length > 0 ? unqueuedTestables[0] : null,
          ].filter(Boolean)
        );

        // Remove the new testable from the untested queue, if it exists
        if (unqueuedTestables.length > 0) {
          setUnqueuedTestables(unqueuedTestables.slice(1));
        }
      }
      setCurrentMark(null);
      setUserAnswer({});

      // If we have any midroll lectures that need to appear, show them
      showMidrollLecture(nextTestable);
    } else {
      if (!correctlyAnswered) {
        setTestableQueue([...testableQueue.slice(1), currentTestable]);
      }

      goToVictoryScreen();
    }
  };

  const nextQuestionKanaLesson = (mark: ?("CORRECT" | "INCORRECT")) => {
    setLecturesStatus("inactive");

    // Question stage here may be bumped up 1 by the current result, since this happens after the user answers.
    const nextTimeQuestionStage =
      getQuestionStage(currentTestable, results) + (mark === "CORRECT" ? 1 : 0);

    // If this is not the final question
    if (testableQueue.length > 1) {
      const nextTestable = testableQueue[1];
      // Answered question correctly less than 3 times
      // 1st time: We are showing the user the answer so they can learn. Add back to the end of queue. Don't add new stuff yet.
      // 2nd time: We are showing the user a hint. Add to back of queue again. Add a new testable to the queue as well.
      // 3rd time: Answered correctly with no hints. Good job, remove this testable from the queue.
      if (nextTimeQuestionStage <= 1) {
        // User is now familiar with this testable. Add to back of queue again.
        setTestableQueue([...testableQueue.slice(1), currentTestable]);
      }
      if (nextTimeQuestionStage === 2) {
        // Add new testable (if it exists) and current testable to testing queue
        setTestableQueue(
          [
            ...testableQueue.slice(1),
            unqueuedTestables.length > 0 ? unqueuedTestables[0] : null,
            currentTestable,
          ].filter(Boolean)
        );
        // Remove the new testable from the untested queue, if it exists
        if (unqueuedTestables.length > 0) {
          setUnqueuedTestables(unqueuedTestables.slice(1));
        }
      }
      if (nextTimeQuestionStage >= 3) {
        // Add new testable to testing queue if it exists
        setTestableQueue(
          [
            ...testableQueue.slice(1),
            unqueuedTestables.length > 0 ? unqueuedTestables[0] : null,
          ].filter(Boolean)
        );
        // Remove the new testable from the untested queue, if it exists
        setUnqueuedTestables(unqueuedTestables.slice(1));
      }
      setCurrentMark(null);
      setUserAnswer({});

      // If we have any midroll lectures that need to appear, show them
      showMidrollLecture(nextTestable);
    } else {
      goToVictoryScreen();
    }
  };

  const questionStage = getQuestionStage(currentTestable, results);

  const overlayModal = (
    <OverlayModal
      closeModal={() => setExitModalVisible(false)}
      title={
        <Text style={styles.exitModalTitle}>
          Are you sure you want to quit?
        </Text>
      }
      visible={exitModalVisible}
    >
      <Text>You'll lose all your progress so far.</Text>
      <View style={styles.exitModalBottom}>
        <View style={styles.modalButtonWrapper}>
          <Button
            theme="primary_ghost"
            onPress={() => {
              setExitModalVisible(false);
              props.navigation.navigate("Learn");
            }}
          >
            <Text style={styles.buttonQuit}>Quit Lesson</Text>
          </Button>
        </View>
        <Button theme="secondary" onPress={() => setExitModalVisible(false)}>
          <Text style={styles.buttonContinue}>Continue Lesson</Text>
        </Button>
      </View>
    </OverlayModal>
  );

  if (lectures != null && lectures.length > 0 && lecturesStatus === "active") {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <LectureScreen
          lectureIndex={lectureIndex}
          lectures={lectures}
          setLecturesStatus={setLecturesStatus}
          setLectureIndex={setLectureIndex}
          setExitModalVisible={setExitModalVisible}
          splots={splots}
        />
        {overlayModal}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView
        style={styles.lessonScreenWrapper}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ImageBackground
          style={styles.backgroundImage}
          imageStyle={styles.backgroundImage}
          source={getBackgroundImage(currentTestable.context?.location)}
        >
          {["KANA_WORD", "J_WORD"].includes(currentTestable.question.type) ? (
            <WordLesson
              currentMark={currentMark}
              currentTestable={currentTestable}
              goToNextQuestion={
                ["HIRAGANA", "KATAKANA"].includes(lesson.id.slice(0, 8))
                  ? nextQuestionKanaLesson
                  : nextQuestion
              }
              lecturesStatus={lecturesStatus}
              setExitModalVisible={setExitModalVisible}
              questionStage={questionStage}
              results={results}
              setCurrentMark={setCurrentMark}
              setLecturesStatus={setLecturesStatus}
              setResults={setResults}
              userAnswer={userAnswer}
            >
              {getAnswerFields()}
            </WordLesson>
          ) : (
            <SentenceLesson
              currentMark={currentMark}
              currentTestable={currentTestable}
              goToNextQuestion={nextQuestion}
              lecturesStatus={lecturesStatus}
              setExitModalVisible={setExitModalVisible}
              results={results}
              setCurrentMark={setCurrentMark}
              setLecturesStatus={setLecturesStatus}
              setResults={setResults}
              splots={splots}
              userAnswer={userAnswer}
            >
              {getAnswerFields()}
            </SentenceLesson>
          )}
        </ImageBackground>
      </KeyboardAvoidingView>
      {overlayModal}
    </SafeAreaView>
  );
}

function mapStateToProps(state: StoreState, ownProps: OwnProps) {
  return {
    refetch: ownProps.route?.params?.refetch || null,
    lesson: ownProps.route?.params?.lesson || null,
    userId: ownProps.route?.params?.userId || null,
    splots: ownProps.route?.params?.splots || null,
  };
}

export default connect(mapStateToProps)(LessonScreen);
