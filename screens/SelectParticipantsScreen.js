import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {screenHeight, screenWidth } from "../styles/commonStyles";
import GradientBackground from "../components/GradientBackground";

const SelectParticipantsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  // Sample data for friends and groups
  const friends = [
    { id: "1", name: "John Doe", image: require("../assets/profile_pics/BEAR.webp") },
    { id: "2", name: "Jane Smith", image: require("../assets/profile_pics/OWL.webp") },
    { id: "3", name: "Alice", image: require("../assets/profile_pics/RABBIT.webp") },
    { id: "4", name: "Bob", image: require("../assets/profile_pics/SEAL.webp") },
  ];

  const groups = [
    { id: "5", name: "React Devs", image: require("../assets/profile_pics/RABBIT.webp") },
    { id: "6", name: "Music Lovers", image: require("../assets/profile_pics/OWL.webp") },
  ];

  const allParticipants = [...friends, ...groups];

  // Set initial selected participants from route.params
  useEffect(() => {
    if (route.params?.currentParticipants) {
      setSelectedParticipants(route.params.currentParticipants);
    }
  }, [route.params?.currentParticipants]);

  // Filter participants based on search query
  const filteredParticipants = allParticipants.filter((participant) =>
    participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle participant selection
  const toggleSelection = (id) => {
    if (selectedParticipants.some((participant) => participant.id === id)) {
      setSelectedParticipants(selectedParticipants.filter((participant) => participant.id !== id));
    } else {
      const newParticipant = allParticipants.find((participant) => participant.id === id);
      setSelectedParticipants([...selectedParticipants, newParticipant]);
    }
  };

  // Save and return selected participants
  const handleSave = () => {
    navigation.navigate("NewEventScreen", { selectedParticipants });
  };

  return (
    <GradientBackground style={{ flex: 1 }}>
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={35} color="#e9e9e9" />
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>Select Participants</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#333" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search participants..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Participant List */}
      <FlatList
        data={filteredParticipants}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
        style={styles.participantContainer} // Added style prop
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.participants}
            onPress={() => toggleSelection(item.id)}
          >
            <Image source={item.image} style={styles.participantImage} />
            {selectedParticipants.some((participant) => participant.id === item.id) && (
              <View style={styles.overlay}>
                <Ionicons name="checkmark-circle" size={40} color="#4CAF50" />
              </View>
            )}
            <Text style={styles.participantName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:"10%",
    width: "100%",
    flex: 1,
  },
  participantContainer:{
    width: screenWidth,
    height: 10,
    alignContent: "center",
    backgroundColor: "#f5f5f5",
    borderRadius:30,
    marginTop:"5%"
  },
  backArrow: {
    position: "absolute",
    top: "3%",
    left: 20,
    zIndex: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 20,
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  participants: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    width: screenWidth / 4,
  },
  participantImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 40,
  },
  participantName: {
    textAlign: "center",
    fontSize: 12,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginHorizontal: 70,
    marginBottom: "8%",
    marginTop: "10%",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SelectParticipantsScreen;
