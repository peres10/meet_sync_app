import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import profilePics from "../utils/profilePics"; // Assuming profilePics contains group images or defaults

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const GroupDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { group } = route.params || {}; // Default to empty object if params are missing
  const groupAvatar = group?.avatarFile ? profilePics[group.avatarFile] : profilePics.BEAR;

  return (
    <ScrollView contentContainerStyle={[styles.container, { alignItems: "center" }]}>
      {/* Back Arrow Icon */}
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Group Image */}
      <View style={styles.profileImageContainer}>
        <Image source={groupAvatar} style={styles.profileImage} />
      </View>

      {/* Group Information */}
      <View style={[styles.backgroundContainer, { width: screenWidth }]}>
        <View style={styles.groupInfo}>
          <Text style={styles.groupName}>{group.groupName}</Text>
          <Text style={styles.groupDescription}>
            {group?.description || "No description available"}
          </Text>
        </View>

              {/* Privacy Type */}
      <View style={styles.privacyContainer}>
        <Text style={styles.privacyText}>
          <Text style={group?.isPrivate ? styles.privateText : styles.publicText}>
            {group?.isPrivate ? "Private" : "Public"}
          </Text>
        </Text>
      </View>

        {/* Group Members */}
        <Text style={styles.sectionTitle}>Members:</Text>
        <View style={styles.membersContainer}>
          {group?.members && group.members.length > 0 ? (
            group.members.map((member, index) => (
              <View key={index} style={styles.memberItem}>
                <Image
                  source={profilePics[member?.avatarFile] || profilePics.DEFAULT}
                  style={styles.memberImage}
                />
                <Text style={styles.memberName}>{member?.name || "Unknown Member"}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noMembersText}>No members in this group</Text>
          )}
        </View>
      </View>
    </ScrollView>
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
  profileImageContainer: {
    alignItems: "center",
    position: "absolute",
    top: 50,
    zIndex: 2,
  },
  profileImage: {
    width: 130, // Larger group profile picture
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
  groupInfo: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  groupName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  groupDescription: {
    fontSize: 15,
    color: "#777",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3fb59e",
    marginBottom: 10,
    alignSelf: "flex-start",
    marginLeft: 16,
  },
  membersContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  memberItem: {
    alignItems: "center",
    marginBottom: 15,
  },
  memberImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 5,
  },
  memberName: {
    fontSize: 16,
    color: "#333",
  },
  noMembersText: {
    fontSize: 16,
    color: "#777",
    marginTop: 10,
  },
  privateText:{
    fontSize:20,
    color:"#d50000",
    fontWeight: "bold"
  },
  publicText:{
    fontSize:20,
    color:"#007BFF",
    fontWeight: "bold"
  },
  privacyText:{
    fontSize:20,
  }
});

export default GroupDetailScreen;
