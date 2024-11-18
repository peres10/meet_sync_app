import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const { width: screenWidth } = Dimensions.get("window");

const NewEventScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [participants, setParticipants] = useState([]); // Holds the selected participants

  // Update participants if returned from AddParticipantsScreen
  React.useEffect(() => {
    if (route.params?.selectedParticipants) {
      setParticipants(route.params.selectedParticipants);
    }
  }, [route.params?.selectedParticipants]);

  const handleRemoveParticipant = (id) => {
    setParticipants(participants.filter((participant) => participant.id !== id));
  };

  const handleSaveEvent = () => {
    if (!eventName || !description || !location) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    Alert.alert("Success", "Event created successfully!");
    navigation.navigate("EventsScreen");
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#333" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Text style={styles.header}>Create New Event</Text>

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

        {/* Date and Time Picker */}
        <TouchableOpacity onPress={showDatePickerHandler} style={styles.datePicker}>
          <Ionicons name="calendar" size={24} color="#333" />
          <Text style={styles.dateText}>
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display="default"
            onChange={onDateChange}
          />
        )}

        {/* Participants Box */}
        <View style={styles.participantsBox}>
          {participants.length === 0 ? (
            <Text style={styles.emptyText}>No participants selected</Text>
          ) : (
            <View style={styles.participantsContainer}>
              {participants.map((participant) => (
                <View key={participant.id} style={styles.participantItem}>
                  <Image source={participant.image} style={styles.participantImage} />
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
              navigation.navigate("SelectParticipantsScreen", { currentParticipants: participants })
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  backArrow: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  scrollContainer: {
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: screenWidth * 0.9,
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
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    width: screenWidth * 0.9,
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
  participantsBox: {
    width: screenWidth * 0.9,
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
    flexWrap: "wrap",
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
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: screenWidth * 0.9,
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default NewEventScreen;
