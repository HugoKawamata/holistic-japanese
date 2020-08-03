/* @flow */
import React, { type Node } from "react";
import NativeIcon, {
  type MaterialIconsGlyphs,
} from "react-native-vector-icons/MaterialIcons";

export type IconName = MaterialIconsGlyphs;

type Props = {
  color: string,
  name: MaterialIconsGlyphs,
  size: number,
};

export default function Icon(props: Props): Node {
  const { name, size, color } = props;
  return <NativeIcon name={name} size={size} color={color} />;
}
