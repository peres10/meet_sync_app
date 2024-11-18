// screens/NotificationsScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import Button from "../components/Button";
import Icon from "react-native-vector-icons/Ionicons";
import { commonStyles, screenHeight, screenWidth} from "../styles/commonStyles";

const NotificationsScreen = ({ navigation }) => {
  // State to track which text link is currently selected
  const [selectedLink, setSelectedLink] = useState("notifications");

  return (
    <View style={commonStyles.container}>
      <TouchableOpacity
        style={styles.backButton} 
        onPress={() =>
          navigation.goBack()
        }
      >
        <Icon name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <Text style={styles.titleText}>Notifications</Text>
      
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        {/* Notifications Link */}
        <TouchableOpacity
          onPress={() => setSelectedLink("notifications")}
        >
          <Text
            style={[
              styles.linkText,
              selectedLink === "notifications" && styles.linkTextSelected,
            ]}
          >
            Notifications
          </Text>
        </TouchableOpacity>

        {/* Messages Link */}
        <TouchableOpacity
          onPress={() => setSelectedLink("messages")}
        >
          <Text
            style={[
              styles.linkText,
              { marginLeft: 20 },
              selectedLink === "messages" && styles.linkTextSelected,
            ]}
          >
            Messages
          </Text>
        </TouchableOpacity>
      </View>
      
      <TextInput style={styles.input} placeholder="Filter Notifications" />
      <View style={styles.content_box}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  content_box: {
    width: screenWidth,
    height: screenHeight * 0.90,
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.40)",
    borderRadius: 67,
  },
  titleText: {
    marginTop: "10%",
    fontSize: 35,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  input: {
    fontSize: 15,
    padding: 15,
    width: "95%",
    borderRadius: 12,
    marginBottom: "5%",
    backgroundColor: "#fff",
  },
  linkText: {
    fontSize: 25,
    marginHorizontal: "10%",
    color: "#303030",
  },
  linkTextSelected: {
    color: "#268bd4", 
    fontSize: 27,
    textDecorationLine: "underline", 
  },
  backButton: {
    position: "absolute",
    top: "8%",
    left: "10%",
  },
});

export default NotificationsScreen;
