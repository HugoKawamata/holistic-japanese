// @flow
/**
 * @format
 */

import "react-native-gesture-handler";
import * as React from "react";
import { StyleSheet, AppRegistry, View, Text as NatText } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GoogleSignin } from "@react-native-community/google-signin";
import { Provider, connect } from "react-redux";

import LoginScreen from "./src/screens/Login";
import LearnScreen from "./src/screens/Learn";
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
