import * as React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../../components/Text";

const styles = StyleSheet.create({
  learnScreenWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

type Props = {||};

export default function LearnScreen(props: Props) {
  return (
    <View style={styles.learnScreenWrapper}>
      <Text>Learn</Text>
    </View>
  );
}
