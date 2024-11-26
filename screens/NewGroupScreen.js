import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
  Modal,
  Switch, // Import the Switch component
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import GradientBackground from "../components/GradientBackground";
import { db } from "../firebaseConfig"; // Import your Firebase config
import { collection, addDoc } from "firebase/firestore"; // Firestore methods

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const NewGroupScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Initialize state, fallback to current values if coming from another screen
  const [groupName, setGroupName] = useState(route.params?.groupName || "");
  const [description, setDescription] = useState(route.params?.description || "");
  const [location, setLocation] = useState(route.params?.location || "");
  const [participants, setParticipants] = useState(route.params?.participants || []);
  const [showModal, setShowModal] = useState(false); // State for confirmation modal
  const [isPrivate, setIsPrivate] = useState(false); // State for the private group toggle

  // Handle participants update when returning from SelectParticipantsScreen
  useEffect(() => {
    if (route.params?.selectedParticipants) {
      setParticipants(route.params.selectedParticipants);
    }
  }, [route.params?.selectedParticipants]);

  const handleRemoveParticipant = (id) => {
    setParticipants(participants.filter((participant) => participant.id !== id));
  };

  const handleSaveGroup = async () => {
    if (!groupName || !description) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      // Prepare group data to be saved
      const groupData = {
        groupName: groupName,  // Corrected typo here
        description: description,
        isPrivate,
      };

      // Add the group to Firestore collection "groups"
      const docRef = await addDoc(collection(db, "groups"), groupData);

      // Show success message
      Alert.alert("Success", "Group created successfully!");

      // Navigate back to the groups list screen (Main screen or any other)
      navigation.navigate("Main");

    } catch (error) {
      console.error("Error adding group: ", error);
      Alert.alert("Error", "There was an issue saving the group. Please try again.");
    }
  };


  const handleBackPress = () => {
    setShowModal(true); // Show the confirmation modal
  };

  const handleCancel = () => {
    setShowModal(false); // Close the modal
  };

  const handleConfirm = () => {
    setShowModal(false);
    navigation.navigate("Main"); // Navigate to HomeScreen
  };

  return (
    <GradientBackground style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Back Arrow */}
        <TouchableOpacity style={styles.backArrow} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={30} color="#333" />
        </TouchableOpacity>

        <Text style={styles.header}>Create New Group</Text>

        {/* Confirmation Modal */}
        <Modal
          visible={showModal}
          transparent
          animationType="slide"
          onRequestClose={handleCancel}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Are you sure you want to cancel creating this group?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleCancel}
                >
                  <Text style={styles.modalButtonText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalConfirmButton]}
                  onPress={handleConfirm}
                >
                  <Text style={styles.modalButtonText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Rounded Container */}
        <View style={styles.roundedContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            {/* Group Name */}
            <TextInput
              style={styles.input}
              placeholder="Group Name"
              value={groupName}
              onChangeText={setGroupName}
            />

            {/* Description */}
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              multiline
            />

            {/* Participants Box */}
            <View style={styles.participantsBox}>
              {participants.length === 0 ? (
                <Text style={styles.emptyText}>No participants selected</Text>
              ) : (
                <View style={styles.participantsContainer}>
                  {participants.map((participant) => (
                    <View key={participant.id} style={styles.participantItem}>
                      <Image
                        source={participant.image}
                        style={styles.participantImage}
                      />
                      <TouchableOpacity
                        style={styles.trashIcon}
                        onPress={() => handleRemoveParticipant(participant.id)}
                      >
                        <FontAwesome name="trash" size={16} color="#f00" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}

              {/* Add Participants Button */}
              <TouchableOpacity
                style={styles.addButton}
                onPress={() =>
                  navigation.navigate("SelectParticipantsScreen", {
                    currentParticipants: participants,
                    groupName,
                    description,
                    location,
                  })
                }
              >
                <Ionicons name="add" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Private Group Toggle */}
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Private Group</Text>
              <Switch
                value={isPrivate}
                onValueChange={setIsPrivate}
                thumbColor={isPrivate ? "#3fb59e" : "#ddd"}
                trackColor={{ false: "#ccc", true: "#3fb59e" }}
              />
            </View>
          </ScrollView>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveGroup}>
            <Text style={styles.saveButtonText}>Save Group</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GradientBackground>
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
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: "20%",
    marginBottom: 10,
    color: "#333",
  },
  roundedContainer: {
    width: screenWidth,
    height: screenHeight * 0.6,
    borderRadius: 40,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginTop: "5%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#ddd",
  },
  modalConfirmButton: {
    backgroundColor: "#3fb59e",
  },
  modalButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  halfWidth: {
    width: "48%",
  },
  timePickerMargin: {
    marginLeft: 10,
  },
  participantsBox: {
    width: "100%",
    minHeight: 150,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginVertical: 10,
    padding: 10,
    position: "relative",
  },
  emptyText: {
    textAlign: "center",
    color: "#777",
  },
  participantsContainer: {
    flexDirection: "row",
  },
  participantItem: {
    position: "relative",
    marginRight: 10,
    marginBottom: 10,
  },
  participantImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  trashIcon: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 2,
  },
  addButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3fb59e",
    justifyContent: "center",
    alignItems: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  switchLabel: {
    fontSize: 16,
    color: "#333",
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: "#3fb59e",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginBottom: "15%",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default NewGroupScreen;
