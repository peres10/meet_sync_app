import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { commonStyles, screenHeight, screenWidth } from "../styles/commonStyles";
import GroupsListComponent from "../components/GroupListComponent";

const GroupsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <View style={commonStyles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <Text style={styles.titleText}>Groups</Text>
      <TextInput
        style={styles.input}
        placeholder="Search Groups"
        value={searchQuery}
        onChangeText={handleSearchChange} // Update search query
      />
      <View style={styles.content_box}>
        <GroupsListComponent searchQuery={searchQuery} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  content_box: {
    width: screenWidth,
    height: screenHeight * 0.70,
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
  backButton: {
    position: "absolute",
    top: "8%",
    left: "10%",
  },
});

export default GroupsScreen;
