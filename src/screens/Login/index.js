/* @flow */
import * as React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  statusCodes,
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-community/google-signin";
import { loadGoogleSignin } from "../../store/thunks/loaders";
import color from "../../util/color";
import { fontSize } from "../../util/font";
import Text from "../../components/Text";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  bottomSection: {
    marginBottom: height * 0.3,
  },
  loginScreenWrapper: {
    backgroundColor: "rgba(92,60,220,0.4)",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    color: color.WHITE,
    fontSize: 72,
    // fontWeight: "bold",
  },
  nameJapanese: {
    color: color.WHITE,
    fontSize: fontSize.large,
    fontWeight: "bold",
  },
  logo: {
    borderRadius: 15,
    height: 100,
    width: 100,
  },
  logoWrapper: {},
  topSection: {
    alignItems: "center",
    marginTop: height * 0.18,
  },
});

type Props = {|
  loadGoogleSignin: typeof loadGoogleSignin,
  // This is ok to be untyped, we dont do anything with it internally
  // eslint-disable-next-line flowtype/no-weak-types
  navigation: any,
|};

export function LoginScreen(props: Props): React.Node {
  const { navigation } = props;
  navigation.setOptions({
    headerShown: false,
  });

  const [loading, setLoading] = React.useState(false);

  const googleSignIn = async () => {
    setLoading(true);
    try {
      GoogleSignin.hasPlayServices();
      const signInData = await GoogleSignin.signIn();
      props.loadGoogleSignin(signInData.idToken, signInData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
    <ImageBackground
      style={styles.backgroundImage}
      source={require("../../../assets/images/akiba.jpg")}
    >
      {/* $FlowFixMe */}
      <LinearGradient
        style={styles.loginScreenWrapper}
        colors={[
          "rgba(92,60,220,1)",
          "rgba(92,60,220,0.4)",
          "rgba(92,60,220,1)",
        ]}
      >
        <View style={styles.topSection}>
          <View style={styles.logoWrapper}>
            <Image
              style={styles.logo}
              source={require("../../../assets/images/logo-small-alt.png")}
            />
          </View>
          <Text style={styles.name}>Issei</Text>
          <Text style={styles.nameJapanese}>いっせい</Text>
        </View>
        <View style={styles.bottomSection}>
          <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            onPress={googleSignIn}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            disabled={loading}
          />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

// $FlowFixMe I don't like typing these connected methods
export default connect(null, {
  loadGoogleSignin,
})(LoginScreen);
