// @flow
import React from "react";
import NativeIcon, {
  type MaterialIconsGlyphs,
} from "react-native-vector-icons/MaterialIcons";

type Props = {
  color: string,
  name: MaterialIconsGlyphs,
  size: number,
};

export function Icon(props: Props) {
  return <NativeIcon name={props.name} size={props.size} color={props.color} />;
}
