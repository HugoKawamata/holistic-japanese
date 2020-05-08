// @flow
import * as React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import color from "../../util/color";
import { fontSize } from "../../util/font";
import Text from "../Text";

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.INCOMPLETE_CELL,
    borderRadius: 10,
    height: 160,
    justifyContent: "flex-end",
    marginHorizontal: 16,
    paddingHorizontal: 14,
    paddingBottom: 10,
    width: 260,
  },
  bigText: {
    fontWeight: "500",
  },
  smallText: {
    fontSize: 16,
    opacity: 0.6,
  },
});

export type Props = {|
  bigText: string,
  blockOut: boolean,
  disabled?: boolean,
  onPress: () => any,
  smallText: string,
|};

export default function LinkCard(props: Props): React.Node {
  const getTextColor = (textColor: string) => {
    textColor;
  };

  return (
    <View style={{ opacity: props.disabled ? 0.5 : 1 }}>
      <TouchableOpacity
        activeOpacity={props.disabled ? 1 : 0.2}
        style={styles.card}
        onPress={props.disabled ? () => {} : props.onPress}
      >
        <Text style={styles.bigText}>{props.bigText}</Text>
        <Text style={styles.smallText}>{props.smallText}</Text>
      </TouchableOpacity>
    </View>
  );
}
