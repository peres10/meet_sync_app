// screens/EditProfileScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import profilePics from "../utils/profilePics"; // Import profile pictures
import { useNavigation } from "@react-navigation/native";

import { useUser } from "../context/UserProvider";
import { updateUserData, updateUserPassword } from "../services/auth";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const EditProfileScreen = () => {
  const navigation = useNavigation(); // Get the navigation object

  const { setUser, user } = useUser();

  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);

  const [location, setLocation] = useState(user.location ? user.location : "");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [profileImage, setProfileImage] = useState(
    user.avatarFile ? profilePics[user.avatarFile] : profilePics.BEAR
  );
  const [profileImageName, setProfileImageName] = useState(user.avatarFile);

  const [modalVisible, setModalVisible] = useState(false);

  const handleSave = async () => {
    if (password && password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    } else {
      await updateProfile();
    }
  };

  const selectProfileImage = (image) => {
    setProfileImage(profilePics[image]);
    setProfileImageName(image);
    setModalVisible(false);
  };

  const updateProfile = async () => {
    try {
      const updatedData = {
        uid: user.uid,
        username,
        email,
        location,
        avatarFile: profileImageName,
      };

      updateUserPassword(password);

      await updateUserData(user, updatedData);

      setUser(updatedData);
      Alert.alert("Success", "Profile information updated!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Profile"), // Navigate back to ProfileScreen after saving
        },
      ]);
    } catch (error) {
      console.error("Error updating profile: ", error);
      Alert.alert("Error", "Failed to update profile, please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.goBack()} // Navigate back to ProfileScreen
      >
        <Ionicons name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>

      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={profileImage} style={styles.profileImage} />
          <Ionicons
            name="camera"
            size={24}
            color="#3fb59e"
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose a Profile Picture</Text>
            <FlatList
              data={Object.entries(profilePics)}
              keyExtractor={(item) => item[0]}
              numColumns={3}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => selectProfileImage(item[0])}
                  style={styles.imageWrapper}
                >
                  <Image source={item[1]} style={styles.modalImage} />
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.flatListContent}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={[styles.backgroundContainer, { width: screenWidth }]}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.userInfo}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              editable={false}
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
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
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: "#000",
    backgroundColor: "#fff",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 2,
  },
  backgroundContainer: {
    height: screenHeight - 80,
    marginTop: 100,
    paddingTop: 60,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBottom: 80,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 20,
    width: "90%",
  },
  userInfo: {
    width: 350,
    padding: 10,
    marginBottom: 20,
    marginTop: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  halfWidth: {
    width: "48%",
  },
  saveButton: {
    backgroundColor: "#3fb59e",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: "5%",
    width: "100%",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    height: "95%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  flatListContent: {
    alignItems: "center",
  },
  imageWrapper: {
    margin: 5,
  },
  modalImage: {
    width: (screenWidth - 100) / 3,
    height: (screenWidth - 100) / 3,
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProfileScreen;
