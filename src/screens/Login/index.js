/* @flow */
import * as React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Button } from "react-native";
import {
  statusCodes,
  GoogleSignin,
} from "@react-native-community/google-signin";
import { loadGoogleSignin } from "../../store/thunks/loaders";
import Text from "../../components/Text";

const styles = StyleSheet.create({
  loginScreenWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

type Props = {|
  loadGoogleSignin: typeof loadGoogleSignin,
  // This is ok to be untyped, we dont do anything with it internally
  // eslint-disable-next-line flowtype/no-weak-types
  navigation: any,
|};

export function LoginScreen(props: Props): React.Node {
  const googleSignIn = async () => {
    try {
      GoogleSignin.hasPlayServices();
      const signInData = await GoogleSignin.signIn();
      props.loadGoogleSignin(signInData.idToken, signInData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <View style={styles.loginScreenWrapper}>
      <Text>Login</Text>
      <Button title="Google Sign In" onPress={googleSignIn} />
      <Button
        title="Login here"
        onPress={() => props.navigation.navigate("Learn")}
      />
    </View>
  );
}

// $FlowFixMe I don't like typing these connected methods
export default connect(null, {
  loadGoogleSignin,
})(LoginScreen);
