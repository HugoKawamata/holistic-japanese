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
  primary: {
    // textColor: color.WHITE,
    buttonColor: color.BUTTON_P,
    highlightColor: color.BUTTON_P_HIGHLIGHT,
  },
  secondary: {
    // textColor: color.TEXT_P,
    buttonColor: color.BUTTON_P,
    highlightColor: color.BUTTON_P_HIGHLIGHT,
  },
  tertiary: {
    // textColor: color.WHITE,
    buttonColor: color.BUTTON_T,
    highlightColor: color.BUTTON_T_HIGHLIGHT,
  },
};

type Props = {|
  children: React.Element<*> | Array<React.Element<*>>, // Anything goes within the button
  disabled?: boolean,
  onPress: () => any,
  theme: "primary" | "secondary" | "tertiary",
|};

export default function Button(props: Props): React.Node {
  const getTextColor = (textColor: string) => {
    textColor;
  };

  const { buttonColor, highlightColor } = theme[props.theme];

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
              backgroundColor: buttonColor,
              borderWidth: props.theme === "secondary" ? 1 : 0,
              borderColor:
                props.theme === "secondary" ? buttonColor : "transparent",
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
