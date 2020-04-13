// @flow
import React, { useState, type Node } from "react";
// $FlowFixMe flow 0.112.0 hates react native's types and thinks it has no exports
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
  const [questionAnswered, setQuestionAnswered] = useState(false);

  const createAnswerFields = () => {
    const answer = testableQueue[0].answer;
    switch (answer.type) {
      case "romaji":
        return answer.text.split(",").map((charRomaji, i) => (
          <TextInput
            key={`input-${i}`}
            style={styles.singleCharAnswerField}
            placeholder=""
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
    const csvAnswer = userAnswer
      .entries()
      .sort()
      .reduce((acc, kvPair) => acc + "," + kvPair[1]);

    if (csvAnswer === testableQueue[0].answer.text) {
      // Answer is correct!
      if (unqueuedTestables.length > 0) {
        setTestableQueue([...testableQueue, unqueuedTestables[0]]);
      }
    } else {
      // Answer is incorrect!
      setTestableQueue([...testableQueue, testableQueue[0]]);
    }

    setQuestionAnswered(true);
  };

  const goToVictoryScreen = () => {
    console.log("your name is jeff");
  };

  const nextQuestion = () => {
    if (testableQueue.length > 1) {
      setTestableQueue(testableQueue.slice(1));
    } else {
      // This was the last question
      goToVictoryScreen();
    }
  };

  const currentTestable = testableQueue[0];

  return (
    <View style={styles.lessonScreenWrapper}>
      <View style={styles.questionWrapper}>
        <Text style={styles.question}>{currentTestable.question.text}</Text>
      </View>
      <View style={styles.answerFieldWrapper}>{createAnswerFields()}</View>
      <Button color={color.ACTION} onPress={answerQuestion}>
        <Text>Answer</Text>
        <FuriganaText kana="こたえる" text="答える" />
      </Button>
    </View>
  );
}

export default LessonScreen;
