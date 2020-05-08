// @flow
import * as React from "react";
import { TouchableOpacity, StyleSheet, View, ScrollView } from "react-native";
import color from "../../util/color";
import { fontSize } from "../../util/font";
import Text from "../Text";
import LinkCard, { type Props as LinkCardProps } from "../LinkCard";

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    fontWeight: "600",
  },
  headingWrapper: {
    marginLeft: 16,
    marginBottom: 16,
  },
  wrapper: {
    paddingBottom: 36,
  },
});

type Props = {|
  heading: string,
  linkCardProps: Array<LinkCardProps>,
|};

export default function SideSlider(props: Props): React.Node {
  return (
    <View style={styles.wrapper}>
      <View style={styles.headingWrapper}>
        <Text style={styles.heading}>{props.heading}</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {props.linkCardProps.map((card) => (
          <LinkCard {...card} />
        ))}
      </ScrollView>
    </View>
  );
}
