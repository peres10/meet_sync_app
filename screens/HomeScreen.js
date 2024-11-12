// screens/HomeScreen.js
import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import CalendarComponent from "../components/CalendarComponent";
import EventsListComponent from "../components/EventListComponent";
import { commonStyles } from "../styles/commonStyles";

const HomeScreen = ({ navigation }) => {
  const profileImagePath =
    "asset:/profile_pics/DALL·E 2024-11-12 18.44.41 - A Persona 5-inspired profile icon featuring a cute, bold black silhouette of a puffin with a round, soft shape to make it appear adorable. The silhoue.webp"; // Placeholder image URL

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      {/* Top bar with profile and notifications icons */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require("../assets/profile_pics/SEAL.webp")}
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
    borderColor: "#000", // High-contrast border color
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
