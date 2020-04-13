// @flow
/**
 * @format
 */

import "react-native-gesture-handler";
import * as React from "react";
// $FlowFixMe flow 0.112.0 hates react native's types and thinks it has no exports
import { StyleSheet, AppRegistry, View, Text as NatText } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GoogleSignin } from "@react-native-community/google-signin";
import { Provider, connect } from "react-redux";

import LoginScreen from "./src/screens/Login";
import LearnScreen from "./src/screens/Learn";
import LessonScreen from "./src/screens/Lesson";
import type { State as StoreState } from "./src/store/types/store";
import store from "./src/store";
import { name as appName } from "./app.json";

GoogleSignin.configure();

const Stack = createStackNavigator();

type Props = {
  loggedIn: boolean,
};

export function App(props: Props) {
  return (
    <Provider store={store}>
      {/* <ApolloProvider client={apollo}> */}
      <NavigationContainer>
        {props.loggedIn ? (
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
      {/* </ApolloProvider> */}
    </Provider>
  );
}

function mapStateToProps(state: StoreState) {
  return {
    loggedIn: state.user.loggedIn,
  };
}

export default connect(mapStateToProps)(App);

AppRegistry.registerComponent(appName, () => App);
