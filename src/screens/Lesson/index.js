// @flow
import React, { useState, type Node, createRef, useEffect } from "react";
import { StyleSheet, View, TextInput, Image } from "react-native";
// import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Sound from "react-native-sound";
import FuriganaText from "../../components/Text/FuriganaText";
import Text from "../../components/Text";
import Button from "../../components/Button";
import color from "../../util/color";
import type {
  NextLesson_user_nextLesson as Lesson,
  NextLesson_user_nextLesson_testables as Testable,
} from "../Learn/__generated__/NextLesson";
import { romajiHiraganaMap, hiraganaRomajiMap } from "./util";
import styles from "./styles";
import PrefaceScreen from "./Preface";
import TitleScreen from "./Title";

const SEND_RESULTS = gql`
  mutation sendResults($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

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
      results: [],
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

  const [results, setResults] = useState(initMarks(testables));

  const [currentResult, setCurrentResult] = useState(null); // Result is null if question not answered yet

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
              currentResult === "INCORRECT"
                ? styles.incorrectAnswerField
                : null,
            ]}
            editable={currentResult == null}
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
            {currentResult === "INCORRECT" ? (
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

  const getSplitQuestion = () => {
    if (currentTestable.question.type !== "J_WORD") {
      throw new Error("Cannot split a question if it's not a Japanese word");
    }

    let unbrokenQuestion = currentTestable.question.text;
    let splitQuestion = [];

    // We have to go backwards due to lya/lyu/lyo
    while (unbrokenQuestion.length > 0) {
      let current = unbrokenQuestion[unbrokenQuestion.length - 1];
      unbrokenQuestion = unbrokenQuestion.slice(0, unbrokenQuestion.length - 1);
      if (Object.keys(hiraganaRomajiMap).includes(current)) {
        splitQuestion = [current, ...splitQuestion];
      } else {
        current = `${unbrokenQuestion[unbrokenQuestion.length - 1]}${current}`;
        splitQuestion = [current, ...splitQuestion];
      }
    }
    return splitQuestion;
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

  const answerRomajiQuestion = () => {
    const splitQuestion = getSplitQuestion();
    const csvAnswer = getCSVAnswer();
    const splitAnswer = csvAnswer.split(",");

    let result;
    if (csvAnswer === currentTestable.answer.text) {
      // Answer is correct!
      setCurrentResult("CORRECT");
      result = "CORRECT";
    } else {
      // Answer is incorrect!
      setCurrentResult("INCORRECT");
      result = "INCORRECT";
    }

    const characterResults = splitQuestion.reduce(
      (resultsMap, char: string, index: number) => {
        console.log(index);
        console.log(splitAnswer, char);
        console.log(splitAnswer[index], hiraganaRomajiMap[char]);
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
            results: [
              ...(results[`char-${char}`]?.results || []),
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
        results: [...results[currentTestable.question.text].results, result],
      },
    });
  };

  const goToVictoryScreen = () => {
    console.log(results);
    props.navigation.navigate("Reference");
    props.navigation.navigate("Hiragana");
  };

  const nextQuestion = () => {
    let timesAnsweredCorrect = results[
      currentTestable.question.text
    ].results.filter((m) => m === "CORRECT").length;

    // If this is not the final question
    if (testableQueue.length > 1) {
      console.log(timesAnsweredCorrect);
      console.log(results);
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
      setCurrentResult(null);
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
    if (currentResult === "CORRECT") {
      return (
        <Button theme="success" onPress={nextQuestion}>
          <FuriganaText kana="せいかい" text="正解" />
          <Text>Correct!</Text>
        </Button>
      );
    } else if (currentResult === "INCORRECT") {
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
          onPress={answerRomajiQuestion}
          disabled={getCSVAnswer() === ""}
        >
          <FuriganaText kana="こたえる" text="答える" />
          <Text>Answer</Text>
        </Button>
      );
    }
  };

  const displayResult = () => {
    if (currentResult === "CORRECT") {
      return <View></View>;
    } else if (currentResult === "INCORRECT") {
      return <View></View>;
    } else {
      return null;
    }
  };

  const displayEmojiOrImage = () => {
    let timesAnsweredCorrect = results[
      currentTestable.question.text
    ].results.filter((m) => m === "CORRECT").length;

    // If we're displaying a note, the bottom section gets too big, so don't display the emoji here.
    if (
      timesAnsweredCorrect >= 2 &&
      !(timesAnsweredCorrect === 2 && currentResult === "CORRECT") &&
      currentTestable.notes?.text != null
    ) {
      return <View style={styles.emojiWrapper} />;
    }

    if (currentTestable.question.emoji != null) {
      return (
        <View style={styles.emojiWrapper}>
          <Text style={styles.emoji}>{currentTestable.question.emoji}</Text>
        </View>
      );
    }
  };

  const displayNote = () => {
    const timesAnsweredCorrect = results[
      currentTestable.question.text
    ].results.filter((m) => m === "CORRECT").length;
    let dialogueText = null;
    if (currentResult === "CORRECT") {
      dialogueText = "Correct!";
    } else if (currentResult === "INCORRECT") {
      dialogueText = "Incorrect";
    } else if (timesAnsweredCorrect === 0) {
      // Give them the answer the first time they see the question
      dialogueText = currentTestable.notes?.text;
    }
    return (
      <View style={styles.noteSection}>
        {dialogueText == null ? null : (
          <View style={styles.dialogueWrapper}>
            <View style={styles.dialogueBubble}>
              <Text style={styles.dialogue}>{dialogueText}</Text>
            </View>
            <View style={styles.triangleWrapper}>
              <View style={styles.triangle} />
            </View>
          </View>
        )}
        <View style={styles.fyuchanWrapper}>
          {displayEmojiOrImage()}
          <Image
            source={
              dialogueText == null
                ? require("../../../assets/images/fyu-mouth-closed.png")
                : require("../../../assets/images/fyu-mouth-open.png")
            }
            style={styles.fyuchan}
          />
        </View>
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
