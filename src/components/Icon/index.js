// @flow
import React, { type Node } from "react";
import NativeIcon, {
  type MaterialIconsGlyphs,
} from "react-native-vector-icons/MaterialIcons";

type Props = {
  color: string,
  name: MaterialIconsGlyphs,
  size: number,
};

export default function Icon(props: Props): Node {
  return <NativeIcon name={props.name} size={props.size} color={props.color} />;
}
