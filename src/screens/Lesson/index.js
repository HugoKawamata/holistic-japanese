// @flow
import React, { useState, type Node, createRef, useEffect } from "react";
import { View, TextInput, Image } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Sound from "react-native-sound";
import FuriganaText from "../../components/Text/FuriganaText";
import Text from "../../components/Text";
import color from "../../util/color";
import type {
  NextLesson_user_nextLesson as Lesson,
  NextLesson_user_nextLesson_testables as Testable,
} from "../Learn/__generated__/NextLesson";
import {
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
import ProgressBar from "./ProgressBar";

const SEND_RESULTS = gql`
  mutation sendResults(
    $results: [Result]!
    $userId: ID!
    $content: LessonContent!
  ) {
    addLessonResults(results: $results, userId: $userId, content: $content)
  }
`;

type Props = {|
  navigation: any,
  route: {
    params: {
      lesson: Lesson,
      userId: string,
    },
  },
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
  const isKanaLesson = props.route.params.lesson.content !== "OTHER";
  props.navigation.setOptions({
    title: isKanaLesson ? "" : "レッスン・Lesson", // If kana lesson, we show the title in the topSection
    headerStyle: {
      backgroundColor: isKanaLesson ? color.KANA_Q_BG : color.NAVBAR,
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
      },
    },
    headerTintColor: isKanaLesson ? color.WHITE : color.NAVBAR_TEXT,
    headerTitleStyle: {
      color: isKanaLesson ? color.WHITE : color.NAVBAR_TEXT,
    },
  });

  const { userId, lesson } = props.route.params;
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

  const [lessonStarted, setLessonStarted] = useState(false);

  const [addLessonResults, { data }] = useMutation(SEND_RESULTS);

  useEffect(() => {
    setInputRefs((inputRefs) =>
      Array(testableQueue[0].answer.text.split(",").length)
        .fill()
        .map((_, i) => inputRefs[i] || createRef())
    );
  }, [testableQueue[0]]);

  const currentTestable = testableQueue[0];

  const getAnswerFields = () => {
    const answer = currentTestable.answer;
    switch (answer.type) {
      case "ROMAJI":
        const answerParts = answer.text.split(",");

        const inputs = answerParts.map((charRomaji, i) => (
          <TextInput
            key={`${currentTestable.question.text}-${i}`}
            ref={inputRefs[i]}
            style={[
              styles.singleCharAnswerField,
              currentMark === "INCORRECT" ? styles.incorrectAnswerField : null,
            ]}
            editable={currentMark == null}
            placeholder={romajiHiraganaMap[charRomaji]}
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
                      console.log(error);
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
          <View key={`input-${i}`}>
            {inputs[i]}
            {currentMark === "INCORRECT" ? (
              <Text style={styles.correction}>{charRomaji}</Text>
            ) : null}
          </View>
        ));

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

  const goToVictoryScreen = () => {
    const formattedResults = formatResultsForMutation(results);
    console.log(formattedResults);
    addLessonResults({
      variables: {
        results: formattedResults,
        userId: userId,
        content: lesson.content,
      },
    });
    props.navigation.navigate("Reference");
    props.navigation.navigate("Hiragana", {
      completedContent: lesson.content,
      results,
      testables: lesson.testables,
      modalOpen: true,
    });
  };

  const goToNextQuestion = () => {
    // Question stage here may be bumped up 1 by the current result, since this happens after the user answers.
    const nextTimeQuestionStage = getQuestionStage(currentTestable, results);
    // If this is not the final question
    if (testableQueue.length > 1) {
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
      console.log(
        testableQueue.map((t) => t.question.text),
        unqueuedTestables.map((t) => t.question.text)
      );
    } else {
      goToVictoryScreen();
    }
  };

  // TODO: Update this
  const displayResult = () => {
    if (currentMark === "CORRECT") {
      return <View></View>;
    } else if (currentMark === "INCORRECT") {
      return <View></View>;
    } else {
      return null;
    }
  };

  const questionStage = getQuestionStage(currentTestable, results);

  if (lecture != null && lecture.length > 0) {
    return <LectureScreen lecture={lecture} setLecture={setLecture} />;
  }

  return (
    <View style={styles.lessonScreenWrapper}>
      <View style={styles.topSection}>
        <ProgressBar testables={lesson.testables} results={results} />
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
          {displayResult()}
        </View>
      </View>
    </View>
  );
}

export default LessonScreen;
