// @flow
import NativeIcon from "react-native-vector-icons/MaterialIcons";

type Props = {
  color: string,
  name: string,
  size: number,
};

export function Icon(props: Props) {
  return <Icon name={props.name} size={props.size} color={props.color} />;
}
