/* @flow */
import * as React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";

import type { State as StoreState } from "../../store/types/store";
import Icon from "../../components/Icon";
import color from "../../util/color";
import LoginScreen from "../Login";
import LearnScreen from "../Learn";
import LessonScreen from "../Lesson";
import ReferenceScreen from "../Reference";
import HiraganaReferenceScreen from "../Reference/Hiragana";
import TabBar from "./TabBar";

type Props = {
  loggedIn: boolean,
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  safeAreaLoginTop: {
    flex: 0,
    backgroundColor: color.LOGIN_BACKGROUND,
  },
  safeAreaLoginBottom: {
    flex: 1,
    backgroundColor: color.LOGIN_BACKGROUND,
  },
});

const LoginStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const NavRoot = createStackNavigator();

type TabProps = {|
  color: string,
  size: number,
|};

function MainTabs() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen
          name="Learn"
          component={LearnScreen}
          options={{
            // eslint-disable-next-line react/display-name
            tabBarIcon: ({ color: tabColor, size }: TabProps) => (
              <Icon name="book" color={tabColor} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Reference"
          component={ReferenceScreen}
          options={{
            // eslint-disable-next-line react/display-name
            tabBarIcon: ({ color: tabColor, size }: TabProps) => (
              <Icon name="find-in-page" color={tabColor} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

function NavRootScreen() {
  return (
    <NavRoot.Navigator
      screenOptions={{
        headerStyle: {
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
        },
      }}
    >
      <NavRoot.Screen
        name="Tabs"
        component={MainTabs}
        options={{
          headerShown: false,
        }}
      />
      <NavRoot.Screen name="Lesson" component={LessonScreen} />
      <NavRoot.Screen
        name="Hiragana"
        component={HiraganaReferenceScreen}
        options={{ title: "ひらがな・Hiragana" }}
      />
    </NavRoot.Navigator>
  );
}

export function Splash(props: Props): React.Node {
  const { loggedIn } = props;
  return (
    <NavigationContainer>
      {!loggedIn ? (
        <>
          <SafeAreaView style={styles.safeAreaLoginTop} />
          <SafeAreaView style={styles.safeAreaLoginBottom}>
            <LoginStack.Navigator>
              <LoginStack.Screen
                name="ロッグイン・Login"
                component={LoginScreen}
              />
            </LoginStack.Navigator>
          </SafeAreaView>
        </>
      ) : (
        <NavRootScreen />
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
