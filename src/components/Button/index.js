// @flow
import * as React from "react";
// $FlowFixMe flow 0.112.0hates react native's types and thinks it has no exports
import { TouchableOpacity, StyleSheet, View } from "react-native";
import Text from "../../components/Text";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
});

type Props = {|
  children: React.Element<*> | Array<React.Element<*>>, // Anything goes within the button
  color: string,
  onPress: () => any,
|};

export default function Button(props: Props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={StyleSheet.flatten([
          styles.button,
          { backgroundColor: props.color },
        ])}
      >
        {props.children}
      </View>
    </TouchableOpacity>
  );
}
