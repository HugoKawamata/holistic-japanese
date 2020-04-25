// @flow
import * as React from "react";
import {
  StyleSheet,
  View,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import color from "../../util/color";
import Text from "../Text";
import Button from "../Button";
import Icon from "../Icon";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    backgroundColor: color.WHITE,
    borderRadius: 10,
    height: height * 0.75,
    paddingTop: 30,
    paddingBottom: 40,
    width: width * 0.85,
  },
  modalHeaderWrapper: {
    flexDirection: "row",
  },
  modalCloseButton: {
    backgroundColor: "#ff0000",
    position: "absolute",
  },
  modalWrapper: {
    alignItems: "center",
    backgroundColor: "rgba(99, 99, 99, 0.3)",
    flexGrow: 1,
    justifyContent: "center",
  },
});

type Props = {|
  children: ?(React.Element<*> | Array<React.Element<*>>),
  closeModal: any,
  visible: boolean,
  title: React.Element<*> | Array<React.Element<*>>,
|};

export function OverlayModal(props: Props) {
  return (
    <Modal
      transparent
      visible={props.visible}
      onRequestClose={props.closeModal}
    >
      <TouchableOpacity style={styles.modalWrapper} onPress={props.closeModal}>
        <View style={styles.modalCloseButton}>
          <Icon name="close" size={14} color={"#ff0000"} />
        </View>
        <View style={styles.content}>
          <View style={styles.modalHeaderWrapper}>{props.title}</View>
          {props.children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
