/**
 * @flow
 */

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Learn: typeof undefined,
  Login: typeof undefined,
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, "Profile">;

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Profile"
>;

export type Props = {
  route: ProfileScreenRouteProp,
  navigation: ProfileScreenNavigationProp,
};
