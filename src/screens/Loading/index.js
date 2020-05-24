/* @flow */

import React from "react";
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Text from "../../components/Text";
import color from "../../util/color";
import { fontSize } from "../../util/font";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
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

export function LoadingScreen() {
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
      </LinearGradient>
    </ImageBackground>
  );
}

export default LoadingScreen;
