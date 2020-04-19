// @flow
import * as React from "react";
import { StyleSheet, AppRegistry, View, Text as NatText } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
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

const Stack = createStackNavigator();

export function Splash(props: Props): React.Node {
  return (
    <NavigationContainer>
      {!props.loggedIn ? (
        <Stack.Navigator>
          <Stack.Screen name="ロッグイン・Login" component={LoginScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="ならう・Learn" component={LearnScreen} />
          <Stack.Screen name="じゅぎょう・Lesson" component={LessonScreen} />
          <Stack.Screen
            name="さんしょう・Reference"
            component={ReferenceScreen}
          />
          <Stack.Screen
            name="ひらがな・Hiragana"
            component={HiraganaReferenceScreen}
          />
        </Stack.Navigator>
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
