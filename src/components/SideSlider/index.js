/* @flow */
import * as React from "react";
import { StyleSheet, View, FlatList } from "react-native";
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
  initialScrollIndex?: number,
  linkCardProps: Array<{|
    ...LinkCardProps,
    key: string,
  |}>,
|};

export default class SideSlider extends React.PureComponent<Props> {
  flatListRef: ?typeof FlatList;

  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    initialScrollIndex: 0,
  };

  render() {
    const { heading, linkCardProps, initialScrollIndex } = this.props;
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
        <FlatList
          ref={(ref) => {
            // $FlowFixMe not sure what the go is here
            this.flatListRef = ref;
          }}
          getItemLayout={(_, index) => ({
            length: 262,
            offset: 262 * index,
            index,
          })}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item }) => <LinkCard key={item.key} {...item} />}
          keyExtractor={(item) => item.key}
          data={linkCardProps}
          initialScrollIndex={initialScrollIndex}
        />
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {}
        </ScrollView> */}
      </View>
    );
  }
}
