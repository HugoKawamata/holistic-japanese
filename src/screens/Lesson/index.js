// @flow
import React, { useState, type Node, createRef, useEffect } from "react";
import { StyleSheet, View, TextInput, Image } from "react-native";
import Sound from "react-native-sound";
import FuriganaText from "../../components/Text/FuriganaText";
import Text from "../../components/Text";
import Button from "../../components/Button";
import color from "../../util/color";
import type {
  NextLesson_user_nextLesson as Lesson,
  NextLesson_user_nextLesson_testables as Testable,
} from "../Learn/__generated__/NextLesson";
import { romajiHiraganaMap } from "./util";
import styles from "./styles";
import PrefaceScreen from "./Preface";
import TitleScreen from "./Title";

type Props = {|
  navigation: any,
  route: {
    params: {
      lesson: Lesson, // TODO: Get this from apollo generated types
    },
  },
|};

const initMarks = (testables: $ReadOnlyArray<Testable>) => {
  return testables.reduce((markMap, testable) => {
    const testableMarks = {
      answers: [],
      marks: [],
    };
    return {
      ...markMap,
      [testable.question.text]: testableMarks,
    };
  }, {});
};

export function LessonScreen(props: Props): Node {
  const { lesson } = props.route.params;
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

  const [preface, setPreface] = useState(lesson.preface);

  const [userAnswer, setUserAnswer] = useState({});

  const [marks, setMarks] = useState(initMarks(testables));

  const [result, setResult] = useState(null); // Result is null if question not answered yet

  const [inputRefs, setInputRefs] = useState([]);

  const [lessonStarted, setLessonStarted] = useState(false);

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

        console.log(inputRefs);
        const inputs = answerParts.map((charRomaji, i) => (
          <TextInput
            ref={inputRefs[i]}
            style={[
              styles.singleCharAnswerField,
              result === "incorrect" ? styles.incorrectAnswerField : null,
            ]}
            editable={result == null}
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
            {result === "incorrect" ? (
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

  const getCSVAnswer = () => {
    const userInputs = Object.entries(userAnswer)
      .sort()
      .map((kvPair) => kvPair[1]); // Just get the values out (the user inputs)
    return userInputs.length === 0
      ? ""
      : userInputs.reduce(
          // $FlowFixMe userInput is always a string
          (acc: string, userInput: mixed) => acc + "," + userInput
        );
  };

  const answerQuestion = () => {
    const csvAnswer = getCSVAnswer();

    console.log(userAnswer);
    console.log(csvAnswer);

    if (csvAnswer === currentTestable.answer.text) {
      // Answer is correct!
      setResult("correct");
      setMarks({
        ...marks,
        [currentTestable.question.text]: {
          answers: [...marks[currentTestable.question.text].answers, csvAnswer],
          marks: [...marks[currentTestable.question.text].marks, "correct"],
        },
      });
    } else {
      // Answer is incorrect!
      setResult("incorrect");
      // Re-add the failed testable to the back of the queue
      // setTestableQueue([...testableQueue, currentTestable]);
      setMarks({
        ...marks,
        [currentTestable.question.text]: {
          answers: [...marks[currentTestable.question.text].answers, csvAnswer],
          marks: [...marks[currentTestable.question.text].marks, "incorrect"],
        },
      });
    }
  };

  const goToVictoryScreen = () => {
    props.navigation.navigate("Reference");
    props.navigation.navigate("Hiragana");
  };

  const nextQuestion = () => {
    let timesAnsweredCorrect = marks[
      currentTestable.question.text
    ].marks.filter((m) => m === "correct").length;

    // If this is not the final question
    if (testableQueue.length > 1) {
      console.log(timesAnsweredCorrect);
      console.log(marks);
      // Answered question correctly less than 3 times
      // 1st time: We are showing the user the answer so they can learn. Add back to the end of queue. Don't add new stuff yet.
      // 2nd time: We are showing the user a hint. Add to back of queue again. Add a new testable to the queue as well.
      // 3rd time: Answered correctly with no hints. Good job, remove this testable from the queue.
      if (timesAnsweredCorrect <= 1) {
        // User is now familiar with this testable. Add to back of queue again.
        setTestableQueue([...testableQueue.slice(1), currentTestable]);
      }
      if (timesAnsweredCorrect === 2) {
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
      if (timesAnsweredCorrect === 3) {
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
      setResult(null);
      setUserAnswer({});
      console.log(
        testableQueue.map((t) => t.question.text),
        unqueuedTestables.map((t) => t.question.text)
      );
    } else {
      goToVictoryScreen();
    }
  };

  const getQuestionTypeText = () => {
    if (
      currentTestable.question.type == "J_WORD" &&
      currentTestable.answer.type == "ROMAJI"
    ) {
      return "Type the English letters that correspond to the Japanese.";
    }
    return "";
  };

  const getButton = () => {
    if (result === "correct") {
      return (
        <Button theme="success" onPress={nextQuestion}>
          <FuriganaText kana="せいかい" text="正解" />
          <Text>Correct!</Text>
        </Button>
      );
    } else if (result === "incorrect") {
      return (
        <Button theme="destructive" onPress={nextQuestion}>
          <FuriganaText kana="ちがいます" text="違います" />
          <Text>Incorrect</Text>
        </Button>
      );
    } else {
      return (
        <Button
          theme="action"
          onPress={answerQuestion}
          disabled={getCSVAnswer() === ""}
        >
          <FuriganaText kana="こたえる" text="答える" />
          <Text>Answer</Text>
        </Button>
      );
    }
  };

  const displayResult = () => {
    if (result === "correct") {
      return <View></View>;
    } else if (result === "incorrect") {
      return <View></View>;
    } else {
      return null;
    }
  };

  const displayNote = () => {
    const timesAnsweredCorrect = marks[
      currentTestable.question.text
    ].marks.filter((m) => m === "correct").length;
    let dialogueText = null;
    if (result === "correct") {
      dialogueText = "Correct!";
    } else if (result === "incorrect") {
      dialogueText = "Incorrect";
    } else if (timesAnsweredCorrect === 0) {
      // Give them the answer the first time they see the question
      dialogueText = currentTestable.notes?.text;
    }
    return (
      <View style={styles.noteSection}>
        {dialogueText == null ? null : (
          <>
            <View style={styles.dialogueWrapper}>
              <View style={styles.dialogueBubble}>
                <Text style={styles.dialogue}>{dialogueText}</Text>
              </View>
              <View style={styles.triangleWrapper}>
                <View style={styles.triangle} />
              </View>
            </View>
            <View style={styles.fyuchanWrapper}>
              <Image
                source={require("../../../assets/images/fyu-mouth-open.png")}
                style={styles.fyuchan}
              />
            </View>
          </>
        )}
      </View>
    );
  };

  if (preface != null && preface.length > 0) {
    return <PrefaceScreen preface={preface} setPreface={setPreface} />;
  }

  const { titleScreen } = lesson;

  if (!lessonStarted && titleScreen != null) {
    return (
      <TitleScreen
        title={titleScreen.title}
        image={titleScreen.image}
        setLessonStarted={setLessonStarted}
      />
    );
  }

  return (
    <View style={styles.lessonScreenWrapper}>
      <View style={styles.topSection}>
        <View style={styles.questionWrapper}>
          <Text style={styles.question}>{currentTestable.question.text}</Text>
          <View style={styles.questionTypeWrapper}>
            <Text style={styles.questionType}>{getQuestionTypeText()}</Text>
          </View>
          <View style={styles.answerFieldWrapper}>{getAnswerFields()}</View>
        </View>
      </View>
      <View style={styles.bottomSection}>
        {displayNote()}
        {getButton()}
        {displayResult()}
      </View>
    </View>
  );
}

export default LessonScreen;
