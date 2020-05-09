/* @flow */
import React, { useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import Text from "../../components/Text";
import color from "../../util/color";

const tabButton = {
  alignItems: "center",
  flexDirection: "row",
  flexWrap: "nowrap",
  paddingHorizontal: 16,
  paddingVertical: 8,
};

const styles = StyleSheet.create({
  tabBarWrapper: {
    backgroundColor: color.WHITE,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 8,
    paddingHorizontal: 13,
    paddingTop: 8,
    shadowColor: color.SHADOW,
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  activeTabButton: {
    ...tabButton,
    backgroundColor: color.ACTIVE_TAB_BG,
  },
  inactiveTabButton: {
    ...tabButton,
  },
  tabButton: {
    ...tabButton,
  },
  tabLabel: {
    color: color.TEXT_P,
    fontSize: 20,
    paddingLeft: 5,
  },
});

// This is all handled by navigation
// eslint-disable-next-line flowtype/no-weak-types
export function TabBarButton(props: any) {
  const { descriptors, route, index, state, navigation } = props;

  const anim = useRef(new Animated.Value(state.index === index ? 1 : 0))
    .current;

  React.useEffect(() => {
    Animated.spring(anim, {
      toValue: props.state.index === index ? 1 : 0,
      bounciness: 8,
      useNativeDriver: false,
    }).start();
  }, [state.index]);

  const { options } = descriptors[route.key];
  const label =
    // eslint-disable-next-line no-nested-ternary
    options.tabBarLabel !== undefined
      ? options.tabBarLabel
      : options.title !== undefined
      ? options.title
      : route.name;

  const isFocused = state.index === index;
  const onPress = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: "tabLongPress",
      target: route.key,
    });
  };

  return (
    <Animated.View
      style={{
        backgroundColor: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [color.WHITE, color.ACTIVE_TAB_BG],
        }),
        borderRadius: 50,
        maxWidth: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [80, 250],
        }),
      }}
    >
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.tabButton}
      >
        {options.tabBarIcon({
          color: isFocused ? color.PRIMARY : color.INCOMPLETE_CELL,
          size: 28,
        })}
        {isFocused ? (
          <Text numberOfLines={1} ellipsizeMode="clip" style={styles.tabLabel}>
            {label}
          </Text>
        ) : null}
      </TouchableOpacity>
    </Animated.View>
  );
}

// Don't worry about types in the destructured props here. This is all
// handled by react-navigation.
// eslint-disable-next-line flowtype/no-weak-types
export default function TabBar({ state, descriptors, navigation }: any) {
  return (
    <View style={styles.tabBarWrapper}>
      {state.routes.map((route, index) => (
        <TabBarButton
          key={route.name}
          route={route}
          index={index}
          descriptors={descriptors}
          navigation={navigation}
          state={state}
        />
      ))}
    </View>
  );
}
