// @flow
import * as React from "react";
import {
  StyleSheet,
  AppRegistry,
  SafeAreaView,
  View,
  Text as NatText,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";

import type { State as StoreState } from "../../store/types/store";
import Icon from "../../components/Icon";
import color from "../../util/color";
import LoginScreen from "../Login";
import LearnScreen from "../Learn";
import LessonScreen from "../Lesson";
import ReferenceScreen from "../Reference";
import HiraganaReferenceScreen from "../Reference/Hiragana";
import TabBar from "./TabBar";

type Props = {
  loggedIn: boolean,
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
});

const LoginStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const NavRoot = createStackNavigator();

function getHeaderTitle(route) {
  // Access the tab navigator's state using `route.state`
  const routeName = route.state
    ? // Get the currently active route name in the tab navigator
      route.state.routes[route.state.index].name
    : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
      // In our case, it's "Feed" as that's the first screen inside the navigator
      route.params?.screen || "Feed";

  switch (routeName) {
    case "Learn":
      return "ならう・Learn";
    case "Reference":
      return "さんしょう・Reference";
    default:
      return "";
  }
}

function NavRootScreen() {
  return (
    <NavRoot.Navigator
      screenOptions={{
        headerStyle: {
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
        },
      }}
    >
      <NavRoot.Screen
        name="Tabs"
        component={MainTabs}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })}
      />
      <NavRoot.Screen name="Lesson" component={LessonScreen} />
      <NavRoot.Screen
        name="Hiragana"
        component={HiraganaReferenceScreen}
        options={{ title: "ひらがな・Hiragana" }}
      />
    </NavRoot.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="Learn"
        component={LearnScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Reference"
        component={ReferenceScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="find-in-page" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export function Splash(props: Props): React.Node {
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        {!props.loggedIn ? (
          <LoginStack.Navigator>
            <LoginStack.Screen
              name="ロッグイン・Login"
              component={LoginScreen}
            />
          </LoginStack.Navigator>
        ) : (
          <NavRootScreen />
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
}

function mapStateToProps(state: StoreState) {
  return {
    loggedIn: state.user.loggedIn,
  };
}

// $FlowFixMe I don't like typing these connected methods
export default connect(mapStateToProps)(Splash);
