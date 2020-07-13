/* @flow */
import * as React from "react";
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import color from "../../util/color";
import Icon from "../Icon";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    backgroundColor: color.WHITE,
    borderRadius: 10,
    maxHeight: height * 0.75,
    paddingTop: 30,
    paddingBottom: 40,
    width: width * 0.85,
  },
  modalHeaderWrapper: {
    flexDirection: "row",
    paddingBottom: 10,
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
  closeModal: () => typeof undefined,
  visible: boolean,
  title: React.Element<*> | Array<React.Element<*>>,
|};

export function OverlayModal(props: Props) {
  const { visible, closeModal, title, children } = props;
  return (
    <Modal transparent visible={visible} onRequestClose={closeModal}>
      <TouchableOpacity style={styles.modalWrapper} onPress={closeModal}>
        <View style={styles.modalCloseButton}>
          <Icon name="close" size={14} color={color.PRIMARY} />
        </View>
        <View style={styles.content}>
          <View style={styles.modalHeaderWrapper}>{title}</View>
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export default OverlayModal;
