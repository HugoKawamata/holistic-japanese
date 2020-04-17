// @flow
/**
 * @format
 */

import "react-native-gesture-handler";
import * as React from "react";
import { StyleSheet, AppRegistry, View, Text as NatText } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { GoogleSignin } from "@react-native-community/google-signin";
import { Provider, connect } from "react-redux";
import { ApolloProvider } from "@apollo/react-hooks";

import apollo from "./src/apollo";
import SplashScreen from "./src/screens/Splash";
import store from "./src/store";
import { name as appName } from "./app.json";

GoogleSignin.configure();

type Props = {||};

export function App(props: Props): React.Node {
  return (
    <Provider store={store}>
      <ApolloProvider client={apollo}>
        <SplashScreen />
      </ApolloProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => App);
