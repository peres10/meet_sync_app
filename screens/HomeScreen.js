// screens/HomeScreen.js
import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CalendarComponent from "../components/CalendarComponent";
import EventsListComponent from "../components/EventListComponent";
import profilePics from "../utils/profilePics";
import { useUser } from "../context/UserProvider";

const HomeScreen = ({ navigation }) => {

  const { user } = useUser();
  
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      {/* Top bar with profile and notifications icons */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <View style={styles.profileImageContainer}>
            <Image
              source={user.avatarFile ? profilePics[user.avatarFile] : profilePics.BEAR }
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
      {/* Additional navigation buttons or content */}
    </View>
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
    width: 44, // Outer container is slightly larger than the image
    height: 44,
    borderRadius: 22,
    borderWidth: 3, // Border width for high contrast
    borderColor: "#fff", // High-contrast border color
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
});

export default HomeScreen;
