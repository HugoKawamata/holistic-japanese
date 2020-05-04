// @flow
import * as React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import color from "../../util/color";
import Text from "../Text";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    alignSelf: "stretch",
    borderRadius: 300,
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 6,
    paddingTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  buttonWrapper: {
    alignItems: "center",
    width: "80%",
    justifyContent: "center",
  },
});

const theme = {
  // The text colours are here as a guide and not actually used in the code.
  // Text is not rendered in this component due to possible furigana text and separate english.
  success: {
    // textColor: color.TEXT,
    // ghostTextColor: color.TEXT_S,
    buttonColor: color.BUTTON_S,
    highlightColor: color.BUTTON_S_RIPPLE,
    borderColor: color.BUTTON_S_RIPPLE,
  },
  red: {
    textColor: color.WHITE,
    ghostTextColor: color.TEXT_R,
    buttonColor: color.BUTTON_R,
    highlightColor: color.BUTTON_R_RIPPLE,
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
  disabled?: boolean,
  ghost?: boolean,
  onPress: () => any,
  theme: "success" | "red" | "white",
|};

export default function Button(props: Props): React.Node {
  const getTextColor = (ghostTextColor: string, textColor: string) => {
    props.ghost ? ghostTextColor : textColor;
  };

  const { buttonColor, highlightColor, borderColor } = theme[props.theme];

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={props.disabled ? () => {} : props.onPress}
      >
        <View
          style={[
            styles.button,
            {
              backgroundColor: props.ghost ? "transparent" : buttonColor,
              borderWidth: props.ghost ? 1 : 0,
              borderBottomWidth: props.ghost ? 1 : 0,
              borderColor: props.ghost ? buttonColor : borderColor,
              opacity: props.disabled ? 0.6 : 1,
            },
          ]}
        >
          {props.children}
        </View>
      </TouchableOpacity>
    </View>
  );
}
