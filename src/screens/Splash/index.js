// @flow
import * as React from "react";
import { StyleSheet, AppRegistry, View, Text as NatText } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";

import type { State as StoreState } from "../../store/types/store";
import LoginScreen from "../Login";
import LearnScreen from "../Learn";
import LessonScreen from "../Lesson";
import ReferenceScreen from "../Reference";
import HiraganaReferenceScreen from "../Reference/Hiragana";

type Props = {
  loggedIn: boolean,
};

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
    <NavRoot.Navigator>
      <NavRoot.Screen
        name="Tabs"
        component={MainTabs}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })}
      />
      <NavRoot.Screen
        name="Lesson"
        component={LessonScreen}
        options={{ title: "じゅぎょう・Lesson" }}
      />
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
    <Tab.Navigator>
      <Tab.Screen name="Learn" component={LearnScreen} />
      <Tab.Screen name="Reference" component={ReferenceScreen} />
    </Tab.Navigator>
  );
}
export function Splash(props: Props): React.Node {
  return (
    <NavigationContainer>
      {!props.loggedIn ? (
        <LoginStack.Navigator>
          <LoginStack.Screen name="ロッグイン・Login" component={LoginScreen} />
        </LoginStack.Navigator>
      ) : (
        <NavRootScreen />
      )}
    </NavigationContainer>
  );
}

function mapStateToProps(state: StoreState) {
  return {
    loggedIn: state.user.loggedIn,
  };
}

// $FlowFixMe I don't like typing these connected methods
export default connect(mapStateToProps)(Splash);
