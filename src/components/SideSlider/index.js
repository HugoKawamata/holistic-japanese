/* @flow */
import * as React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import color from "../../util/color";
import { fontSize } from "../../util/font";
import Text from "../Text";
import Icon from "../Icon";
import LinkCard, { type Props as LinkCardProps } from "../LinkCard";

const styles = StyleSheet.create({
  heading: {
    fontSize: fontSize.large,
    fontWeight: "bold",
  },
  headingWrapper: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 16,
    marginBottom: 16,
  },
  icon: {
    paddingRight: 10,
  },
  wrapper: {
    paddingBottom: 36,
  },
});

type Props = {|
  heading: string,
  linkCardProps: Array<{|
    ...LinkCardProps,
    key: string,
  |}>,
|};

export default function SideSlider(props: Props): React.Node {
  const { heading, linkCardProps } = props;
  return (
    <View style={styles.wrapper}>
      <View style={styles.headingWrapper}>
        {linkCardProps.every((prop) => prop.disabled) ? (
          <View style={styles.icon}>
            <Icon size={18} name="lock" color={color.TEXT} />
          </View>
        ) : null}
        <Text style={styles.heading}>{heading}</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {linkCardProps.map((card) => (
          <LinkCard key={card.key} {...card} />
        ))}
      </ScrollView>
    </View>
  );
}
