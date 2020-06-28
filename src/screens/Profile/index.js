/* @flow */
import React, { useState } from "react";
import { View, Image, StyleSheet, ScrollView, Dimensions } from "react-native";
import { gql } from "apollo-boost";
import { Query as ApolloQuery } from "@apollo/react-components";
import { connect } from "react-redux";
import { nukeAccount, logout } from "../../store/thunks/loaders";
import Text from "../../components/Text";
import OverlayModal from "../../components/OverlayModal";
import { fontSize } from "../../util/font";
import color from "../../util/color";
import Button from "../../components/Button";
import type { MyInfo as TMyInfoQuery } from "./__generated__/MyInfo";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  dangerIcon: {
    fontSize: 60,
  },
  deleteButtonText: {
    color: color.PRIMARY,
  },
  deleteButtonWrapper: {
    alignItems: "center",
    marginTop: 10,
  },
  heading: {
    fontSize: fontSize.lessonTitle,
    fontWeight: "bold",
  },
  headingWrapper: {
    paddingBottom: 36,
    paddingLeft: 16,
    paddingTop: 40,
  },
  englishButtonText: {
    color: color.WHITE,
  },
  japaneseButtonText: {
    color: color.WHITE,
  },
  modalTitle: {
    fontSize: fontSize.title,
  },
  nukeAccountContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  profileData: {
    color: color.TEXT,
    fontSize: fontSize.regular,
  },
  profileDataLabel: {
    color: color.TEXT_M,
    fontSize: fontSize.regular,
  },
  profileDataLabelWrapper: {
    alignItems: "center",
    backgroundColor: color.HINT_BG,
    borderRadius: 15,
    marginRight: 10,
    paddingVertical: 3,
    paddingHorizontal: 15,
  },
  profileDataRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  profileDataWrapper: {
    alignItems: "stretch",
    flexGrow: 1,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  profileImageWrapper: {
    alignItems: "center",
    marginBottom: 40,
  },
  profileScreenScroll: {
    backgroundColor: color.WHITE,
  },
  profileScreenWrapper: {
    alignItems: "stretch",
    backgroundColor: color.WHITE,
    flexGrow: 1,
    height: height - 60, // 36 is about the height of the tab bar
  },
  logoutWrapper: {
    alignItems: "center",
    marginBottom: 40,
  },
  safeButtonText: {
    color: color.WHITE,
    fontSize: fontSize.large,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  safeButtonWrapper: {
    alignItems: "center",
  },
  subtitle: {
    color: color.TEXT,
    fontSize: fontSize.regular,
    textAlign: "center",
  },
  warningWrapper: {
    alignItems: "center",
    paddingTop: 30,
  },
});

const MY_INFO_QUERY = gql`
  query MyInfo {
    me {
      id
      picture
      name
      email
      availableCourses {
        completedLessons {
          id
        }
      }
      completedCourses {
        completedLessons {
          id
        }
      }
    }
  }
`;

const MyInfoQuery: ApolloQuery<TMyInfoQuery, {}> = ApolloQuery;

type Props = {|
  logout: typeof logout,
  nukeAccount: typeof nukeAccount,
|};

export function ProfileScreen(props: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <MyInfoQuery query={MY_INFO_QUERY} fetchPolicy="cache-and-network">
      {({ data }) => {
        const completedCoursesCount = data?.me?.completedCourses?.length || 0;
        const completedLessonsCount =
          data?.me?.completedCourses.reduce(
            (acc, c) => acc + (c?.completedLessons?.length || 0),
            0
          ) +
          data?.me?.availableCourses.reduce(
            (acc, c) => acc + (c?.completedLessons?.length || 0),
            0
          );

        return (
          <ScrollView
            style={styles.profileScreenScroll}
            contentContainerStyle={styles.profileScreenScroll}
          >
            <View style={styles.profileScreenWrapper}>
              <View style={styles.headingWrapper}>
                <Text style={styles.heading}>Profile</Text>
              </View>
              <View style={styles.profileImageWrapper}>
                <Image
                  style={styles.profileImage}
                  source={
                    data?.me?.image != null
                      ? { uri: data.me.image }
                      : require("../../../assets/images/default-profile.png")
                  }
                  resizeMode="contain"
                />
              </View>
              <View style={styles.profileDataWrapper}>
                <View style={styles.profileDataRow}>
                  <View style={styles.profileDataLabelWrapper}>
                    <Text style={styles.profileDataLabel}>Name</Text>
                  </View>
                  <Text style={styles.profileData}>{data?.me?.name || ""}</Text>
                </View>
                <View style={styles.profileDataRow}>
                  <View style={styles.profileDataLabelWrapper}>
                    <Text style={styles.profileDataLabel}>Email</Text>
                  </View>
                  <Text style={styles.profileData}>
                    {data?.me?.email || ""}
                  </Text>
                </View>
                <View style={styles.profileDataRow}>
                  <View style={styles.profileDataLabelWrapper}>
                    <Text style={styles.profileDataLabel}>
                      Completed Lessons
                    </Text>
                  </View>
                  <Text style={styles.profileData}>
                    {completedLessonsCount}
                  </Text>
                </View>
                <View style={styles.profileDataRow}>
                  <View style={styles.profileDataLabelWrapper}>
                    <Text style={styles.profileDataLabel}>
                      Completed Courses
                    </Text>
                  </View>
                  <Text style={styles.profileData}>
                    {completedCoursesCount}
                  </Text>
                </View>
              </View>
              <View style={styles.logoutWrapper}>
                <Button theme="primary" onPress={props.logout}>
                  <Text style={styles.japaneseButtonText}>ロッグアウト</Text>
                  <Text style={styles.englishButtonText}>Logout</Text>
                </Button>
              </View>
              <OverlayModal
                closeModal={() => setModalVisible(false)}
                title={<Text style={styles.modalTitle}>Are you sure?</Text>}
                visible={modalVisible}
              >
                <View style={styles.nukeAccountContainer}>
                  <View style={styles.warningWrapper}>
                    <Text style={styles.subtitle}>
                      This will permanently delete all of your progress,
                      results, and account data!
                    </Text>
                    <Text style={styles.dangerIcon}>⚠️</Text>
                    <View style={styles.deleteButtonWrapper}>
                      <Button
                        theme="primary_ghost"
                        onPress={() => props.nukeAccount(data?.me?.email)}
                      >
                        <Text style={styles.deleteButtonText}>
                          Delete all my progress
                        </Text>
                      </Button>
                    </View>
                  </View>
                  <View style={styles.safeButtonWrapper}>
                    <Button
                      theme="secondary"
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.safeButtonText}>Back to safety</Text>
                    </Button>
                  </View>
                </View>
              </OverlayModal>
            </View>
            <View style={styles.logoutWrapper}>
              <Button
                theme="primary_ghost"
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.deleteButtonText}>
                  Delete All Account Data
                </Text>
              </Button>
            </View>
          </ScrollView>
        );
      }}
    </MyInfoQuery>
  );
}

export default connect(null, {
  logout,
  nukeAccount,
})(ProfileScreen);
