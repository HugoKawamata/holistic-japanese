/* @flow */
import * as React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
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
