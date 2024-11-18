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
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const NewEventScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Initialize state, fallback to current values if coming from another screen
  const [eventName, setEventName] = useState(route.params?.eventName || "");
  const [description, setDescription] = useState(route.params?.description || "");
  const [location, setLocation] = useState(route.params?.location || "");
  const [date, setDate] = useState(route.params?.date || new Date());
  const [time, setTime] = useState(route.params?.time || new Date());
  const [participants, setParticipants] = useState(route.params?.participants || []);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerMode, setPickerMode] = useState("date"); // "date" or "time"
  const [showModal, setShowModal] = useState(false); // State for confirmation modal

  // Handle participants update when returning from SelectParticipantsScreen
  useEffect(() => {
    if (route.params?.selectedParticipants) {
      setParticipants(route.params.selectedParticipants);
    }
  }, [route.params?.selectedParticipants]);

  const handleRemoveParticipant = (id) => {
    setParticipants(
      participants.filter((participant) => participant.id !== id)
    );
  };

  const handleSaveEvent = () => {
    if (!eventName || !description || !location) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    Alert.alert("Success", "Event created successfully!");
    navigation.navigate("Main");
  };

  const showDatePickerHandler = (mode) => {
    setShowDatePicker(true);
    setPickerMode(mode);
  };

  const onDateChange = (event, selectedValue) => {
    setShowDatePicker(false);
    if (selectedValue) {
      if (pickerMode === "date") {
        setDate(selectedValue);
      } else {
        setTime(selectedValue);
      }
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
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backArrow} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={30} color="#333" />
      </TouchableOpacity>

      <Text style={styles.header}>Create New Event</Text>

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
              Are you sure you want to cancel creating this event?
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
          {/* Event Name */}
          <TextInput
            style={styles.input}
            placeholder="Event Name"
            value={eventName}
            onChangeText={setEventName}
          />

          {/* Description */}
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          {/* Location */}
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />

          {/* Date and Time Pickers in a Row */}
          <View style={styles.dateTimeRow}>
            <TouchableOpacity
              style={[styles.datePicker, styles.halfWidth]}
              onPress={() => showDatePickerHandler("date")}
            >
              <Ionicons name="calendar" size={24} color="#333" />
              <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.datePicker,
                styles.halfWidth,
                styles.timePickerMargin,
              ]}
              onPress={() => showDatePickerHandler("time")}
            >
              <Ionicons name="time" size={24} color="#333" />
              <Text style={styles.dateText}>{time.toLocaleTimeString()}</Text>
            </TouchableOpacity>
          </View>

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
                  eventName,
                  description,
                  location,
                  date,
                  time,
                })
              }
            >
              <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveEvent}>
            <Text style={styles.saveButtonText}>Save Event</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* DateTimePicker */}
      {showDatePicker && (
        <DateTimePicker
          value={pickerMode === "date" ? date : time}
          mode={pickerMode}
          display="default"
          onChange={onDateChange}
        />
      )}
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 10,
    color: "#333",
  },
  roundedContainer: {
    width: screenWidth,
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 20,
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
  dateTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginVertical: 10,
  },
  dateText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
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
  saveButton: {
    backgroundColor: "#3fb59e",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default NewEventScreen;