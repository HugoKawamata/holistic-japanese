/* @flow */

import "react-native-gesture-handler";
import * as React from "react";
import { AppRegistry } from "react-native";
import { GoogleSignin } from "@react-native-community/google-signin";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/react-hooks";

import apollo from "./src/apollo";
import SplashScreen from "./src/screens/Splash";
import store from "./src/store";
import { name as appName } from "./app.json";

GoogleSignin.configure();

export function App(): React.Node {
  return (
    <Provider store={store}>
      <ApolloProvider client={apollo}>
        <SplashScreen />
      </ApolloProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => App);
