import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CalendarComponent from "../components/CalendarComponent";
import EventsListComponent from "../components/EventListComponent";

const HomeScreen = ({ navigation, isHiddenVisible, toggleHiddenElement, hideHiddenElement }) => {
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

      {/* Hidden Element */}
      {isHiddenVisible && (
        <View style={styles.absoluteHiddenElement}>
          <View style={styles.hiddenOverlay} />
          <View style={styles.hiddenContent}>
            <Image
              source={require("../assets/favicon.png")} // Replace with your image path
              style={styles.hiddenImage}
            />
            <TouchableOpacity onPress={hideHiddenElement}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    position: "absolute", // Absolute positioning
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // Ensures it appears above everything
  },
  hiddenOverlay: {
    position: "absolute", // Overlay that covers the background
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent black background to simulate blur
    zIndex: -1, // Place behind the content
  },
  hiddenContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  hiddenImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  hiddenText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    color: "#007BFF",
    fontSize: 16,
    marginTop: 10,
  },
});

export default HomeScreen;
