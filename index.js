/* @flow */

import "react-native-gesture-handler";
import * as React from "react";
import ApolloClient from "apollo-boost";
import AsyncStorage from "@react-native-community/async-storage";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { AppRegistry } from "react-native";
import { GoogleSignin } from "@react-native-community/google-signin";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/react-hooks";
import { PersistGate } from "redux-persist/integration/react";

import SplashScreen from "./src/screens/Splash";
import LoadingScreen from "./src/screens/Loading";
import getStore from "./src/store";
import { name as appName } from "./app.json";

GoogleSignin.configure();

type Props = {||};
type State = {|
  apolloClient: mixed,
  loaded: boolean,
|};

export class App extends React.Component<Props, State> {
  state = {
    loaded: false,
    apolloClient: null,
  };

  async componentDidMount() {
    const cache = new InMemoryCache();

    const client = new ApolloClient({
      cache,
      uri:
        "http://ec2-52-63-127-15.ap-southeast-2.compute.amazonaws.com:4000/graphql",
    });

    try {
      // See above for additional options, including other storage providers.
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
    } catch (error) {
      // console.error("Error restoring Apollo cache", error);
    }

    this.setState({
      apolloClient: client,
      loaded: true,
    });
  }

  render() {
    const { loaded, apolloClient } = this.state;
    if (!loaded) {
      return <LoadingScreen />;
    }
    const { store, persistor } = getStore();
    return (
      <Provider store={store}>
        <PersistGate loading={loaded} persistor={persistor}>
          <ApolloProvider client={apolloClient}>
            <SplashScreen />
          </ApolloProvider>
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);
