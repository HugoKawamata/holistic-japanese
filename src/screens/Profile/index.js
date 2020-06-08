/* @flow */
import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { gql } from "apollo-boost";
import { Query as ApolloQuery } from "@apollo/react-components";
import { connect } from "react-redux";
import { logout } from "../../store/thunks/loaders";
import Text from "../../components/Text";
import { fontSize } from "../../util/font";
import color from "../../util/color";
import Button from "../../components/Button";
import type { MyInfo as TMyInfoQuery } from "./__generated__/MyInfo";

const styles = StyleSheet.create({
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
  profileData: {
    color: color.TEXT,
    fontSize: fontSize.large,
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
    marginBottom: 80,
  },
  profileScreenWrapper: {
    alignItems: "stretch",
    backgroundColor: color.WHITE,
    flexGrow: 1,
  },
  logoutWrapper: {
    alignItems: "center",
    marginBottom: 40,
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
|};

export function ProfileScreen(props: Props) {
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
                <Text style={styles.profileData}>{data?.me?.email || ""}</Text>
              </View>
              <View style={styles.profileDataRow}>
                <View style={styles.profileDataLabelWrapper}>
                  <Text style={styles.profileDataLabel}>Completed Lessons</Text>
                </View>
                <Text style={styles.profileData}>{completedLessonsCount}</Text>
              </View>
              <View style={styles.profileDataRow}>
                <View style={styles.profileDataLabelWrapper}>
                  <Text style={styles.profileDataLabel}>Completed Courses</Text>
                </View>
                <Text style={styles.profileData}>{completedCoursesCount}</Text>
              </View>
            </View>
            <View style={styles.logoutWrapper}>
              <Button theme="primary" onPress={props.logout}>
                <Text style={styles.japaneseButtonText}>ロッグアウト</Text>
                <Text style={styles.englishButtonText}>Logout</Text>
              </Button>
            </View>
          </View>
        );
      }}
    </MyInfoQuery>
  );
}

export default connect(null, {
  logout,
})(ProfileScreen);
