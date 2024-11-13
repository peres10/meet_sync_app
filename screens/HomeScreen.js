// screens/HomeScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import CalendarComponent from "../components/CalendarComponent"; // Import the CalendarComponent
import { commonStyles } from "../styles/commonStyles";

const HomeScreen = ({ navigation, onLogout }) => {
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      {/* Top bar with profile and notifications icons */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <Ionicons name="notifications" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <CalendarComponent />

      {/* Additional navigation buttons or content */}
      <View style={commonStyles.container}>
        <Button
          title="Go to Events"
          onPress={() => navigation.navigate("Events")}
        />
        <Button
          title="Go to Friends"
          onPress={() => navigation.navigate("Friends")}
        />
        <Button
          title="Go to Groups"
          onPress={() => navigation.navigate("Groups")}
        />
        <Button
          title="Logout(temporary button)"
          onPress={() => onLogout()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});

export default HomeScreen;
