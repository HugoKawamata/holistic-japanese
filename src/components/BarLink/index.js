/* @flow */
import * as React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import color from "../../util/color";
import Text from "../Text";
import Icon from "../Icon";

const styles = StyleSheet.create({
  barLinkWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftNodeWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  main: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: color.INCOMPLETE_CELL,
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 12,
  },
  text: {
    flexGrow: 1,
  },
});

type Props = {|
  leftNode: React.Node,
  onPress: () => void,
  text: string,
|};

export function BarLink(props: Props) {
  const { onPress, leftNode, text } = props;
  return (
    <TouchableOpacity style={styles.barLinkWrapper} onPress={onPress}>
      <View style={styles.leftNodeWrapper}>{leftNode}</View>
      <View style={styles.main}>
        <Text style={styles.text}>{text}</Text>
        <Icon name="chevron-right" size={16} color={color.TEXT_L} />
      </View>
    </TouchableOpacity>
  );
}

export default BarLink;
