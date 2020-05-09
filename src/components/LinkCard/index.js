/* @flow */
import * as React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import color from "../../util/color";
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
  // blockOut: boolean,
  disabled?: boolean,
  onPress: () => mixed,
  smallText: string,
|};

export default function LinkCard(props: Props): React.Node {
  const { disabled, bigText, smallText, onPress } = props;
  return (
    <View style={{ opacity: disabled ? 0.5 : 1 }}>
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.2}
        style={styles.card}
        onPress={disabled ? () => {} : onPress}
      >
        <Text style={styles.bigText}>{bigText}</Text>
        <Text style={styles.smallText}>{smallText}</Text>
      </TouchableOpacity>
    </View>
  );
}

LinkCard.defaultProps = {
  disabled: false,
};
