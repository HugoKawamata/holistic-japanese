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

type Props = {
  loggedIn: boolean,
};

const Stack = createStackNavigator();

export function Splash(props: Props): React.Node {
  console.log(props);
  return (
    <NavigationContainer>
      {!props.loggedIn ? (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Learn" component={LearnScreen} />
          <Stack.Screen name="Lesson" component={LessonScreen} />
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
