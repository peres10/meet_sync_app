import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CalendarComponent from "../components/CalendarComponent";
import EventsListComponent from "../components/EventListComponent";
import profilePics from "../utils/profilePics";
import { useUser } from "../context/UserProvider";
import GradientBackground from "../components/GradientBackground";
import { screenWidth } from "../styles/commonStyles";

const HomeScreen = ({
  navigation,
  isHiddenVisible,
  toggleHiddenElement,
  hideHiddenElement,
}) => {
  const { user } = useUser();

  return (
<<<<<<< HEAD
    <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: "#3fb59e" }}>
      {/* Top bar with profile and notifications icons */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <View style={styles.profileImageContainer}>
            <Image
              source={
                user.avatarFile
                  ? profilePics[user.avatarFile]
                  : profilePics.BEAR
              }
              style={styles.profileImage}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <Ionicons name="notifications" size={26} color="#fff" />
        </TouchableOpacity>
=======
    <GradientBackground style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        {/* Top bar with profile and notifications icons */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <View style={styles.profileImageContainer}>
              <Image
                source={
                  user.avatarFile
                    ? profilePics[user.avatarFile]
                    : profilePics.BEAR
                }
                style={styles.profileImage}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
            <Ionicons name="notifications" size={26} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Calendar Component */}
        <CalendarComponent />

        {/* Events List Component */}
        <EventsListComponent />

        {/* Hidden Element */}
>>>>>>> 3c1a3657ae4c43eb438b166de997b242ba0b2b87
      </View>
      {isHiddenVisible && (
        <View style={styles.absoluteHiddenElement}>
          <View style={styles.hiddenOverlay} />
          <View style={styles.hiddenContent}>
            <TouchableOpacity onPress={hideHiddenElement}>
              <Image
                source={require("../assets/plus.png")}
                style={styles.closeButton}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Groups")}>
              <Image
                source={require("../assets/green_plus.png")}
                style={styles.newPage}
              />
              <Ionicons
                name="chatbubbles"
                size={40}
                color="#5D8F86"
                style={styles.hiddenIcon}
              />
            </TouchableOpacity>
            <Text style={styles.titleText}>New Group</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("NewEventScreen")}
            >
              <Image
                source={require("../assets/green_plus.png")}
                style={styles.newPage}
              />
              <Ionicons
                name="location"
                size={40}
                color="#5D8F86"
                style={styles.hiddenIcon}
              />
            </TouchableOpacity>
            <Text style={styles.titleText}>New Event</Text>
          </View>
        </View>
      )}
    </GradientBackground>
  );
};


const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "15%",
  },
  profileImageContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
  absoluteHiddenElement: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 500, 
  },
  hiddenIcon:{
    color:"#5D8F86",
    height: 40,
    marginTop: 10,
    zIndex: -1, 
  },
  hiddenOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: -1, 
  },
  hiddenContent: {
    width: "23%",
    height: "25%",
    marginLeft: "73%",
    marginTop: "140%",
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex:1,
  },
  actionItem: {
    alignItems: "center",
    marginVertical: 10,
  },
  newPage: {
    width: 25,
    height: 25,
    borderRadius: 30,
    marginBottom: -25,
    marginLeft: -10
  },
  closeButton: {
    color: "#E9E9E9",
    width: 35,
    height: 35,
    borderRadius: 30,
    backgroundColor:"#5D8F86",
    fontSize: 30,
    marginTop: -25,
    marginLeft: 70,
    transform: [{ rotate: "45deg" }]
  },
});

export default HomeScreen;
