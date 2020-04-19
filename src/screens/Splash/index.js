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

const LearnStack = createStackNavigator();

function LearnStackScreen() {
  return (
    <LearnStack.Navigator>
      <LearnStack.Screen name="ならう・Learn" component={LearnScreen} />
      <LearnStack.Screen name="じゅぎょう・Lesson" component={LessonScreen} />
    </LearnStack.Navigator>
  );
}

const ReferenceStack = createStackNavigator();

function ReferenceStackScreen() {
  return (
    <ReferenceStack.Navigator>
      <ReferenceStack.Screen
        name="さんしょう・Reference"
        component={ReferenceScreen}
      />
      <ReferenceStack.Screen
        name="ひらがな・Hiragana"
        component={HiraganaReferenceScreen}
      />
    </ReferenceStack.Navigator>
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
        <Tab.Navigator>
          <Tab.Screen name="Learn" component={LearnStackScreen} />
          <Tab.Screen name="Reference" component={ReferenceStackScreen} />
        </Tab.Navigator>
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
