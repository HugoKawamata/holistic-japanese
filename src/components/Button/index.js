/* @flow */
import * as React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import color from "../../util/color";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    alignSelf: "stretch",
    borderRadius: 300,
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 10,
    paddingTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonWrapper: {
    alignItems: "center",
    width: "80%",
    justifyContent: "center",
  },
});

const themes = {
  // The text colours are here as a guide and not actually used in the code.
  // Text is not rendered in this component due to possible furigana text and separate english.
  primary: {
    // textColor: color.WHITE,
    buttonColor: color.BUTTON_P,
    highlightColor: color.BUTTON_P_HIGHLIGHT,
  },
  secondary: {
    // textColor: color.TEXT_P,
    buttonColor: color.BUTTON_S,
    highlightColor: color.BUTTON_S_HIGHLIGHT,
  },
  tertiary: {
    // textColor: color.WHITE,
    buttonColor: color.BUTTON_T,
    highlightColor: color.BUTTON_T_HIGHLIGHT,
  },
  primary_ghost: {
    // textColor: color.WHITE,
    buttonColor: color.BUTTON_P,
    highlightColor: color.BUTTON_P_HIGHLIGHT,
  },
};

type Props = {|
  children: React.Element<*> | Array<React.Element<*>>, // Anything goes within the button
  disabled?: boolean,
  onPress: () => mixed,
  theme: "primary" | "secondary" | "tertiary" | "primary_ghost",
|};

export default function Button(props: Props): React.Node {
  const { theme, disabled, onPress, children } = props;
  const { buttonColor } = themes[theme];

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.2}
        style={styles.buttonWrapper}
        onPress={disabled ? () => {} : onPress}
      >
        <View
          style={[
            styles.button,
            {
              backgroundColor:
                theme === "primary_ghost" ? color.WHITE : buttonColor,
              borderWidth: theme === "primary_ghost" ? 3 : 0,
              borderColor:
                theme === "primary_ghost" ? buttonColor : "transparent",
              opacity: disabled ? 0.6 : 1,
            },
          ]}
        >
          {children}
        </View>
      </TouchableOpacity>
    </View>
  );
}

Button.defaultProps = {
  disabled: false,
};
