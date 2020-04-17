// @flow
import React, { useState, type Node } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import FuriganaText from "../../components/Text/FuriganaText";
import Text from "../../components/Text";
import Button from "../../components/Button";
import color from "../../util/color";
import styles from "./styles";

type Props = {|
  route: {
    params: {
      lesson: any, // TODO: Get this from apollo generated types
    },
  },
|};

export function LessonScreen(props: Props): Node {
  const { lesson } = props.route.params;
  if (lesson.testables.length < 2) {
    throw new Error("Lesson is too short.");
  }
  const [unqueuedTestables, setUnqueuedTestables] = useState(
    lesson.testables.slice(2)
  );
  const [testableQueue, setTestableQueue] = useState(
    lesson.testables.slice(0, 2)
  );

  const [userAnswer, setUserAnswer] = useState({});

  const [result, setResult] = useState(null); // Result is null if question not answered yet

  const getAnswerFields = () => {
    const answer = testableQueue[0].answer;
    switch (answer.type) {
      case "romaji":
        return answer.text.split(",").map((charRomaji, i) => (
          <TextInput
            key={`input-${i}`}
            style={styles.singleCharAnswerField}
            placeholder=""
            value={userAnswer[`input-${i}`]}
            onChangeText={(text) =>
              setUserAnswer({
                ...userAnswer,
                [`input-${i}`]: text.toLowerCase(),
              })
            }
          />
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

  const answerQuestion = () => {
    const userInputs = Object.entries(userAnswer)
      .sort()
      .map((kvPair) => kvPair[1]); // Just get the values out (the user inputs)
    const csvAnswer =
      userInputs.length === 0
        ? ""
        : userInputs.reduce(
            // $FlowFixMe userInput is always a string
            (acc: string, userInput: mixed) => acc + "," + userInput
          );

    console.log(userAnswer);
    console.log(csvAnswer);

    if (csvAnswer === testableQueue[0].answer.text) {
      // Answer is correct!

      setResult("correct");
      if (unqueuedTestables.length > 0) {
        // Add new testable to testing queue
        setTestableQueue([...testableQueue, unqueuedTestables[0]]);
        // Remove that testable from the untested queue
        setUnqueuedTestables(unqueuedTestables.slice(1));
      }
    } else {
      // Answer is incorrect!
      setResult("incorrect");
      // Re-add the failed testable to the back of the queue
      setTestableQueue([...testableQueue, testableQueue[0]]);
    }
  };

  const goToVictoryScreen = () => {
    console.log("your name is jeff");
  };

  const nextQuestion = () => {
    if (testableQueue.length > 1) {
      setTestableQueue(testableQueue.slice(1));
      setResult(null);
      setUserAnswer({});
      console.log(
        testableQueue.map((t) => t.question.text),
        unqueuedTestables.map((t) => t.question.text)
      );
    } else {
      // This was the last question
      goToVictoryScreen();
    }
  };

  const getButton = () => {
    if (result != null) {
      return (
        <Button color={color.SUCCESS} onPress={nextQuestion}>
          <Text>Next</Text>
          <FuriganaText kana="つぎ" text="次" />
        </Button>
      );
    } else {
      return (
        <Button color={color.ACTION} onPress={answerQuestion}>
          <Text>Answer</Text>
          <FuriganaText kana="こたえる" text="答える" />
        </Button>
      );
    }
  };

  const displayResult = () => {
    if (result === "correct") {
      return (
        <View>
          <Text>Correct!</Text>
          <FuriganaText kana="せいかい" text="正解" />
        </View>
      );
    } else if (result === "incorrect") {
      return (
        <View>
          <Text>Incorrect</Text>
          <FuriganaText kana="ちがいます" text="違います" />
        </View>
      );
    } else {
      return null;
    }
  };


  const displayNote = () => (
    <View>
      <Text style={styles.notes}>
        { testableQueue[0].notes.text }
      </Text>
    </View>
  )

  const currentTestable = testableQueue[0];

  return (
    <View style={styles.lessonScreenWrapper}>
      <View style={styles.questionWrapper}>
        <Text style={styles.question}>{currentTestable.question.text}</Text>
      </View>
      <View style={styles.answerFieldWrapper}>{getAnswerFields()}</View>
      {getButton()}
      {displayResult()}
      {displayNote()}
    </View>
  );
}

export default LessonScreen;
