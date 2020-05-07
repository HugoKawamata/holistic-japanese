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
import { fontSize } from "../../util/font";

const NEXT_LESSON_QUERY = gql`
  query NextLesson($email: String!) {
    user(email: $email) {
      id
      nextLesson {
        content
        lectures {
          title
          text
          image
          position
        }
        titleScreen {
          title
          image
        }
        testables {
          objectId
          objectType
          question {
            type
            emoji
            image
            text
          }
          answer {
            type
            text
          }
          introduction
        }
      }
    }
  }
`;

const styles = StyleSheet.create({
  buttonText: {
    color: color.WHITE,
  },
  learnScreenWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  startButtonEnglish: {
    color: color.WHITE,
    fontSize: fontSize.englishButton,
    textAlign: "center",
  },
});

type Props = {|
  navigation: any,
  userEmail: string,
|};

export function LearnScreen(props: Props): Node {
  const [loading, setLoading] = useState(false);

  const startLesson = () => {
    setLoading(true);

    client
      .query({
        query: NEXT_LESSON_QUERY,
        fetchPolicy: "network-only",
        variables: {
          email: props.userEmail,
        },
      })
      .then((result) => {
        console.log(result);
        setLoading(false);
        props.navigation.push("Lesson", {
          lesson: result.data.user.nextLesson,
          userId: result.data.user.id,
        });
        return result;
      });
  };

  return (
    <View style={styles.learnScreenWrapper}>
      <Button theme="primary" onPress={startLesson}>
        <FuriganaText
          furiStyle={styles.buttonText}
          textStyle={styles.buttonText}
          kana="つぎのじゅぎょうをはじめる"
          text="次の授業を始める"
        />
        <Text style={styles.startButtonEnglish}>Start next lesson</Text>
      </Button>
    </View>
  );
}

function mapStateToProps(state: StoreState) {
  return {
    userEmail: state.user.user?.email,
  };
}

export default connect(mapStateToProps)(LearnScreen);
