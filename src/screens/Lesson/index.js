/* @flow */
import React, { useState, type Node, createRef, useEffect } from "react";
import {
  View,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { connect } from "react-redux";
import Sound from "react-native-sound";
import { type State as StoreState } from "../../store/types/store";
import Text from "../../components/Text";
import color from "../../util/color";
import type {
  AvailableLessons_user_availableCourses_availableLessons as Lesson,
  AvailableLessons_user_availableCourses_availableLessons_testables as Testable,
} from "../Learn/__generated__/AvailableLessons";
import {
  possibleSokuon,
  romajiHiraganaMap,
  hiraganaRomajiMap,
  formatResultsForMutation,
  getQuestionStage,
  getSplitQuestion,
  getCSVAnswer,
} from "./util";
import type { Results } from "./types";
import {
  getTopSectionContent,
  getAnswerSection,
  getHint,
  getButton,
} from "./sectionRenderers";
import styles from "./styles";
import LectureScreen from "./Lecture";
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

type OwnProps = {|
  navigation: any, // eslint-disable-line flowtype/no-weak-types
  route: {
    params: {
      lesson: Lesson,
      refetch: () => {},
      userId: string,
    },
  },
|};

type Props = {|
  ...OwnProps,
  lesson: Lesson,
  refetch: () => {},
  userId: string,
|};

const initResults = (testables: $ReadOnlyArray<Testable>) => {
  return testables.reduce((resultMap, testable) => {
    const testableResults = {
      answers: [],
      marks: [],
    };
    return {
      ...resultMap,
      [testable.question.text]: testableResults,
    };
  }, {});
};

export function LessonScreen(props: Props): Node {
  const { lesson, userId, navigation } = props;
  const isKanaLesson = lesson.id !== "OTHER";
  navigation.setOptions({
    title: isKanaLesson ? "" : "レッスン・Lesson", // If kana lesson, we show the title in the topSection
    // headerTransparent: true,
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
  const testables = lesson.testables.filter(Boolean);

  if (testables.length < 2) {
    throw new Error("Lesson is too short.");
  }

  const [unqueuedTestables, setUnqueuedTestables] = useState(
    testables.slice(2)
  );
  const [testableQueue, setTestableQueue] = useState(testables.slice(0, 2));

  const [lecture, setLecture] = useState(
    lesson.lectures != null
      ? lesson.lectures.filter((lec) => lec.position === "PRETEST")
      : []
  );

  const [userAnswer, setUserAnswer] = useState({});

  const [results: Results, setResults] = useState(initResults(testables));

  const [currentMark, setCurrentMark] = useState(null); // Result is null if question not answered yet

  const [inputRefs, setInputRefs] = useState([]);

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
              currentMark === "INCORRECT" ? styles.incorrectAnswerField : null,
            ]}
            keyboardType={
              Platform.OS === "android" ? "visible-password" : "default"
            } // Prevents autocorrect on android
            autoCorrect={false}
            editable={currentMark == null}
            placeholder={romajiHiraganaMap[charRomaji] || "っ"}
            value={userAnswer[`input-${i}`]}
            onChangeText={(text) => {
              const lowerText = text.toLowerCase();
              if (Object.keys(romajiHiraganaMap).includes(lowerText)) {
                const soundFile = `${lowerText}.mp3`;
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
              }
              // $FlowFixMe Not sure what's happening here
              setUserAnswer({
                ...userAnswer,
                [`input-${i}`]: lowerText,
              });
            }}
          />
        ));

        return answerParts.map((charRomaji, i) => (
          /* eslint-disable-next-line react/no-array-index-key */
          <View key={`input-${i}`}>
            {inputs[i]}
            {currentMark === "INCORRECT" ? (
              <Text style={styles.correction}>{charRomaji}</Text>
            ) : null}
          </View>
        ));
      }
      default:
        return (
          <TextInput
            placeholder="Your answer"
            style={styles.regularAnswerField}
            value={userAnswer["input-0"]}
            onChangeText={(text) =>
              setUserAnswer({
                "input-0": text.toLowerCase(),
              })
            }
          />
        );
    }
  };

  const answerRomajiQuestion = () => {
    const splitQuestion = getSplitQuestion(currentTestable);
    const csvAnswer = getCSVAnswer(userAnswer);
    const splitAnswer = csvAnswer.split(",");

    let mark;
    if (csvAnswer === currentTestable.answer.text) {
      // Answer is correct!
      setCurrentMark("CORRECT");
      mark = "CORRECT";
    } else {
      // Answer is incorrect!
      setCurrentMark("INCORRECT");
      mark = "INCORRECT";
    }

    const characterResults = splitQuestion.reduce(
      (resultsMap, char: string, index: number) => {
        return {
          ...resultsMap,
          [`char-${char}`]: {
            objectId: null,
            objectType: "CHARACTER",
            text: char,
            answers: [
              ...(results[`char-${char}`]?.answers || []),
              splitAnswer[index],
            ],
            marks: [
              ...(results[`char-${char}`]?.marks || []),
              splitAnswer[index] === hiraganaRomajiMap[char]
                ? "CORRECT"
                : "INCORRECT",
            ],
          },
        };
      },
      {}
    );

    setResults({
      ...results,
      ...characterResults,
      [currentTestable.question.text]: {
        objectId: currentTestable.objectId,
        objectType: "WORD",
        text: currentTestable.question.text,
        answers: [...results[currentTestable.question.text].answers, csvAnswer],
        marks: [...results[currentTestable.question.text].marks, mark],
      },
    });
  };

  const goToVictoryScreen = async () => {
    const formattedResults = formatResultsForMutation(results);
    // TODO: await this so we always get the right highlights in the next screen
    await addLessonResults({
      variables: {
        results: formattedResults,
        userId,
        setLessonId: lesson.id,
      },
    });
    props.refetch();
    props.navigation.navigate("Reference");
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
    if (results[nextTestable.question.text].marks.length > 0) {
      return;
    }
    if (numUniqueQuestionsAnswered === 1) {
      setLecture(
        lesson.lectures != null
          ? lesson.lectures.filter((lec) => lec.position === "BEFORE_SECOND")
          : []
      );
      return;
    }
    if (numUniqueQuestionsAnswered === 2) {
      setLecture(
        lesson.lectures != null
          ? lesson.lectures.filter((lec) => lec.position === "BEFORE_THIRD")
          : []
      );
    }
    if (numUniqueQuestionsAnswered === 3) {
      setLecture(
        lesson.lectures != null
          ? lesson.lectures.filter((lec) => lec.position === "BEFORE_FOURTH")
          : []
      );
    }
  };

  const goToNextQuestion = () => {
    // Question stage here may be bumped up 1 by the current result, since this happens after the user answers.
    const nextTimeQuestionStage = getQuestionStage(currentTestable, results);
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

  if (lecture != null && lecture.length > 0) {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <LectureScreen lecture={lecture} setLecture={setLecture} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView
        style={styles.lessonScreenWrapper}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.topSection}>
          {/* <ProgressBar testables={lesson.testables} results={results} /> */}
          {getTopSectionContent(currentTestable)}
        </View>
        <View style={styles.bottomSection}>
          {getHint(questionStage, currentTestable, currentMark)}
          {getAnswerSection(currentTestable, getAnswerFields())}
          <View style={styles.buttonWrapper}>
            {getButton(
              currentMark,
              userAnswer,
              goToNextQuestion,
              answerRomajiQuestion
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function mapStateToProps(state: StoreState, ownProps: OwnProps) {
  return {
    refetch: ownProps.route?.params?.refetch || null,
    lesson: ownProps.route?.params?.lesson || null,
    userId: ownProps.route?.params?.userId || null,
  };
}

export default connect(mapStateToProps)(LessonScreen);
