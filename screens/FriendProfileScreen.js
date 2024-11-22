import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import profilePics from "../utils/profilePics";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const FriendProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = route.params; // Retrieve passed user data

  return (
    <View style={[styles.container, { alignItems: "center" }]}>
      {/* Back Arrow Icon */}
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <Image
          source={profilePics[user.avatarFile] || profilePics.BEAR}
          style={styles.profileImage}
        />
      </View>

      {/* User Information */}
      <View style={[styles.backgroundContainer, { width: screenWidth }]}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.username}</Text>
          <Text style={styles.userDetails}>
            <Ionicons name="mail" size={16} /> {user.email}
          </Text>
          <Text style={styles.userDetails}>
            <Ionicons name="call" size={16} /> {user.phoneNumber || "N/A"}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Mutual Groups:</Text>
        <View style={styles.searchContainer}>
            <Text style={styles.notFoundText}>No groups in common</Text>
        </View>

        <Text style={styles.sectionTitle}>Mutual Friends:</Text>
        <View style={styles.searchContainer}>
            <Text style={styles.notFoundText}>No friends in common</Text>
        </View>

      </View>

      
    </View>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    padding: 16,
  },
  backArrow: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3fb59e",
    marginBottom: 10,
    alignSelf: "flex-start",
    marginLeft: 16,
  },
  searchContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom:40,
  },
  notFoundText: {
    fontSize: 16,
    color: "#777",
    marginTop: 10,
  },
  profileImageContainer: {
    alignItems: "center",
    position: "absolute",
    top: 50,
    zIndex: 2,
  },
  profileImage: {
    width: 130, // Larger profile picture
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: "#000",
    backgroundColor: "#fff",
  },
  backgroundContainer: {
    minHeight: screenHeight - 80, // Set a minimum height
    marginTop: 100,
    paddingTop: 60,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBottom: 100,
  },
  userInfo: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  userDetails: {
    fontSize: 15,
    color: "#777",
    marginVertical: 4,
    flexDirection: "row",
  },
});

export default FriendProfileScreen;
