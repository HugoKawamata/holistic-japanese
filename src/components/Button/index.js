// @flow
import * as React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import color from "../../util/color";
import Text from "../Text";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 5,
    borderBottomWidth: 3,
    justifyContent: "center",
    paddingBottom: 6,
    paddingTop: 10,
    width: "100%",
  },
  buttonWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
});

const theme = {
  // The text colours are here as a guide and not actually used in the code.
  // Text is not rendered in this component due to possible furigana text and separate english.
  action: {
    // textColor: color.WHITE,
    // ghostTextColor: color.TEXT_A,
    buttonColor: color.BUTTON_A,
    highlightColor: color.BUTTON_A_RIPPLE,
    borderColor: color.BUTTON_A_RIPPLE,
  },
  success: {
    // textColor: color.WHITE,
    // ghostTextColor: color.TEXT_S,
    buttonColor: color.BUTTON_S,
    highlightColor: color.BUTTON_S_RIPPLE,
    borderColor: color.BUTTON_S_RIPPLE,
  },
  destructive: {
    // textColor: color.WHITE,
    // ghostTextColor: color.TEXT_D,
    buttonColor: color.BUTTON_D,
    highlightColor: color.BUTTON_D_RIPPLE,
    borderColor: color.BUTTON_D_RIPPLE,
  },
  white: {
    // textColor: color.TEXT_M,
    // ghostTextColor: color.TEXT_M,
    buttonColor: color.BUTTON_W,
    highlightColor: color.BUTTON_W_RIPPLE,
    borderColor: color.PLACEHOLDER,
  },
};

type Props = {|
  children: React.Element<*> | Array<React.Element<*>>, // Anything goes within the button
  ghost?: boolean,
  onPress: () => any,
  theme: "action" | "success" | "destructive" | "white",
|};

export default function Button(props: Props): React.Node {
  const getTextColor = (ghostTextColor: string, textColor: string) => {
    props.ghost ? ghostTextColor : textColor;
  };

  const { buttonColor, highlightColor, borderColor } = theme[props.theme];

  return (
    <TouchableOpacity style={styles.buttonWrapper} onPress={props.onPress}>
      <View
        style={[
          styles.button,
          {
            backgroundColor: props.ghost ? "transparent" : buttonColor,
            borderWidth: props.ghost ? 1 : 0,
            borderBottomWidth: props.ghost ? 1 : 3,
            borderColor: props.ghost ? buttonColor : borderColor,
          },
        ]}
      >
        {props.children}
      </View>
    </TouchableOpacity>
  );
}
