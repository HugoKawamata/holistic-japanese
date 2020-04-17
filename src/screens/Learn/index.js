// @flow
import React, { useState, type Node } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { gql } from "apollo-boost";
import type { State as StoreState } from "../../store/types/store";
import client from "../../apollo";
// import Icon from "../../components/Icon";
import Text from "../../components/Text";
import Button from "../../components/Button";
import FuriganaText from "../../components/Text/FuriganaText";
import color from "../../util/color";

const NEXT_LESSON_QUERY = gql`
  query NextLesson($email: String!) {
    user(email: $email) {
      id
      nextLesson {
        content
        preface {
          text
          image
        }
        testables {
          question {
            type
            image
            text
          }
          answer {
            type
            image
            text
          }
          notes {
            text
          }
        }
      }
    }
  }
`;

const styles = StyleSheet.create({
  learnScreenWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

type Props = {|
  navigation: any,
|};

export function LearnScreen(props: Props): Node {
  const [loading, setLoading] = useState(false);

  const startLesson = () => {
    setLoading(true);

    client
      .query({
        query: NEXT_LESSON_QUERY,
      })
      .then((result) => {
        setLoading(false);
        props.navigation.push("Lesson", {
          lesson: result.data.lesson,
        });
        return result;
      });
  };

  return (
    <View style={styles.learnScreenWrapper}>
      <Button color={color.BUTTON_S} onPress={startLesson}>
        <View style={styles.startButtonContentWrapper}>
          <View style={styles.startButtonEnglishWrapper}>
            <Text style={styles.startButtonEnglish}>Start</Text>
          </View>
          <FuriganaText
            textStyle={styles.startButtonJapanese}
            furiStyle={styles.startButtonFurigana}
            kana="わたしのこうざをはじめる"
            text="私の講座を始める"
          />
        </View>
      </Button>
    </View>
  );
}

function mapStateToProps(state: StoreState) {
  console.log(state);
  return {
    userEmail: state.user.user?.user?.email, // TODO: clean this triple user crap up
  };
}

export default connect(mapStateToProps)(LearnScreen);
