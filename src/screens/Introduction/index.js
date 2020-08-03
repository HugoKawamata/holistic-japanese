/* @flow */

import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import type { State as StoreState } from "../../store/types/store";
import Text from "../../components/Text";
import FuriganaText from "../../components/Text/FuriganaText";
import Button from "../../components/Button";
import Icon, { type IconName } from "../../components/Icon";
import color from "../../util/color";
import { fontSize } from "../../util/font";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  body: {
    paddingBottom: 20,
    paddingHorizontal: 30,
  },
  bodyText: {
    fontSize: 16,
  },
  buttonText: {
    color: color.WHITE,
  },
  buttonWrapper: {
    alignItems: "center",
    paddingBottom: 30,
  },
  dotWrapper: {},
  genderButtonWrapper: {
    alignItems: "center",
    marginBottom: 10,
  },
  genericWrapper: {
    alignItems: "center",
  },
  header: {
    paddingBottom: 10,
  },
  headerText: {
    fontSize: fontSize.modalTitle,
  },
  image: {
    alignItems: "center",
    borderRadius: 16,
    height: 170,
    justifyContent: "center",
    width: 170,
  },
  imageWrapper: {
    alignItems: "center",
    backgroundColor: color.HINT_BG,
    borderRadius: 16,
    height: 190,
    justifyContent: "center",
    marginBottom: 14,
    width: 190,
  },
  introduction: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "space-between",
    paddingTop: 30,
  },
  introductionScreenWrapper: {
    backgroundColor: color.WHITE,
    flexGrow: 1,
  },
  introPanel: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 30,
    width,
  },
  progressDots: {
    flexDirection: "row",
    paddingBottom: 50,
  },
});

const SEND_GENDER = gql`
  mutation sendGender($userEmail: String!, $gender: String!) {
    sendGender(userEmail: $userEmail, gender: $gender)
  }
`;

type OwnProps = {|
  route: {
    params: {
      refetch: () => {},
    },
  },
|};

type Props = {|
  navigation: any, // eslint-disable-line flowtype/no-weak-types
  refetch: () => {},
  userEmail: string,
|};

type PanelInfo = {|
  header: string,
  headerJapanese: string,
  headerFurigana: string,
  body: string,
  icon: IconName,
  button: ?("start" | "gender"),
|};

const introduction: Array<PanelInfo> = [
  {
    header: "Welcome to Issei!",
    headerJapanese: "Isseiへ　ようこそ",
    headerFurigana: "いっせいへ　ようこそ",
    body:
      "Your journey to conversational Japanese starts here! The aim of the Issei learning method is to get you communicating as soon as possible.",
    icon: "question-answer",
    button: null,
  },
  {
    header: "How?",
    headerJapanese: "どうやって？",
    headerFurigana: "どうやって？",
    body:
      "Learning multiple things at once simulates the experience of being immersed in the language. Instead of learning the Japanese alphabet, vocabulary, and grammar one at a time, you'll learn them together.",
    icon: "whatshot",
    button: null,
  },
  {
    header: "For example?",
    headerJapanese: "例えば？",
    headerFurigana: "たとえば？",
    body:
      "To start with, you won't just be memorising Hiragana (the Japanese alphabet). You'll be learning common words which use the letters we're teaching. Much more fun, and much more effective!",
    icon: "school",
    button: null,
  },
  {
    header: "",
    headerJapanese: "",
    headerFurigana: "",
    body:
      "Before we start, we just need your gender so we know which Japanese pronouns to teach first.",
    icon: "wc",
    button: "gender",
  },
];

const introFinal: Array<PanelInfo> = [
  {
    header: "Great!",
    headerJapanese: "いいね！",
    headerFurigana: "いいね！",
    body:
      "It's important to be able to read Japanese words before you do anything else. Let's start out with the \"Intro to Hiragana\" lesson.",
    icon: "play-arrow",
    button: "start",
  },
];

export function IntroductionScreen(props: Props) {
  const { refetch, userEmail, navigation } = props;
  const [pageNumber, setPageNumber] = useState(0);
  const [activeIntro, setActiveIntro] = useState(introduction);
  const [sendGender] = useMutation(SEND_GENDER);

  const getButton = (type: ?("start" | "gender")) => {
    if (type === "start") {
      return (
        <Button
          theme="primary"
          onPress={() => {
            refetch();
            navigation.navigate("Learn");
          }}
        >
          <FuriganaText
            furiStyle={styles.buttonText}
            textStyle={styles.buttonText}
            kana="はじめる"
            text="始める"
          />
          <Text style={styles.buttonText}>Start</Text>
        </Button>
      );
    }
    if (type === "gender") {
      return (
        <>
          <View style={styles.genderButtonWrapper}>
            <Button
              theme="primary"
              onPress={() =>
                sendGender({
                  variables: {
                    userEmail,
                    gender: "F",
                  },
                }).then(() => {
                  setPageNumber(0);
                  setActiveIntro(introFinal);
                })
              }
            >
              <Text style={styles.buttonText}>Female</Text>
            </Button>
          </View>
          <View style={styles.genderButtonWrapper}>
            <Button
              theme="secondary"
              onPress={() =>
                sendGender({
                  variables: {
                    userEmail,
                    gender: "M",
                  },
                }).then(() => {
                  setPageNumber(0);
                  setActiveIntro(introFinal);
                })
              }
            >
              <Text style={styles.buttonText}>Male</Text>
            </Button>
          </View>
          <View style={styles.genderButtonWrapper}>
            <Button
              theme="tertiary"
              onPress={() =>
                sendGender({
                  variables: {
                    userEmail,
                    gender: "X",
                  },
                }).then(() => {
                  setPageNumber(0);
                  setActiveIntro(introFinal);
                })
              }
            >
              <Text style={styles.buttonText}>Other/Rather not say</Text>
            </Button>
          </View>
        </>
      );
    }
    return null;
  };

  const getIntroPanel = (panelInfo: PanelInfo) => {
    return (
      <View style={styles.introPanel}>
        <View style={styles.imageWrapper}>
          <ImageBackground
            style={styles.image}
            imageStyle={{ borderRadius: 16 }}
            source={require("../../../assets/images/empty-logo.png")}
          >
            <Icon name={panelInfo.icon} size={100} color={color.PRIMARY} />
          </ImageBackground>
        </View>
        <View style={styles.genericWrapper}>
          {panelInfo.header !== "" ? (
            <View style={styles.header}>
              <Text style={styles.headerText}>{panelInfo.header}</Text>
            </View>
          ) : null}
          <View style={styles.body}>
            <Text style={styles.bodyText}>{panelInfo.body}</Text>
          </View>
        </View>
        <View style={styles.buttonWrapper}>{getButton(panelInfo.button)}</View>
      </View>
    );
  };

  const onViewRef = useRef(({ viewableItems }) =>
    viewableItems[0].index ? setPageNumber(viewableItems[0].index) : undefined
  );
  const viewConfigRef = useRef({
    itemVisiblePercentThreshold: 50,
  });

  return (
    <View style={styles.introductionScreenWrapper}>
      <FlatList
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        scrollEventThrottle={16} // 60fps
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={0}
        keyExtractor={(item) => item.header.toString()}
        // $FlowFixMe can't be bothered figuring out the types here
        renderItem={({ item }) => getIntroPanel(item)}
        data={activeIntro}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />
      <View style={styles.genericWrapper}>
        <View style={styles.progressDots}>
          {activeIntro.map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <View style={styles.dotWrapper} key={i}>
              <Icon
                name="fiber-manual-record"
                size={16}
                color={pageNumber === i ? color.TEXT_M : color.INCOMPLETE_CELL}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function mapStateToProps(state: StoreState, ownProps: OwnProps) {
  return {
    userEmail: state.user.user?.email,
    refetch: ownProps.route?.params?.refetch || null,
  };
}

export default connect(mapStateToProps)(IntroductionScreen);
