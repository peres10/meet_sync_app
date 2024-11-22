import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
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
  const [selectedParticipants, setSelectedParticipants] = useState(
    route.params?.currentParticipants || []
  );
  const [activeTab, setActiveTab] = useState("All");

  const sliderPosition = useRef(new Animated.Value(0)).current;
  const tabOptions = ["All", "Friends", "Groups"];

  // Sample data
  const friends = [
    {
      id: "1",
      name: "John Doe",
      image: require("../assets/profile_pics/BEAR.webp"),
    },
    {
      id: "2",
      name: "Jane Smith",
      image: require("../assets/profile_pics/OWL.webp"),
    },
    {
      id: "3",
      name: "Alice",
      image: require("../assets/profile_pics/RABBIT.webp"),
    },
    {
      id: "4",
      name: "Bob",
      image: require("../assets/profile_pics/SEAL.webp"),
    },
    {
      id: "5",
      name: "John Doe",
      image: require("../assets/profile_pics/BEAR.webp"),
    },
    {
      id: "6",
      name: "Jane Smith",
      image: require("../assets/profile_pics/OWL.webp"),
    },
  ];

  const groups = [
    {
      id: "7",
      name: "React Devs",
      image: require("../assets/profile_pics/RABBIT.webp"),
    },
    {
      id: "8",
      name: "Music Lovers",
      image: require("../assets/profile_pics/OWL.webp"),
    },
  ];

  const getFilteredParticipants = () => {
    const allParticipants = [...friends, ...groups];
    switch (activeTab) {
      case "Friends":
        return friends.filter((friend) =>
          friend.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      case "Groups":
        return groups.filter((group) =>
          group.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      default:
        return allParticipants.filter((participant) =>
          participant.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
  };

  const filteredParticipants = getFilteredParticipants();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const index = tabOptions.indexOf(tab);
    const tabWidth = screenWidth / tabOptions.length;

    Animated.timing(sliderPosition, {
      toValue: index * (tabWidth - 10),
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const toggleSelection = (id) => {
    if (selectedParticipants.some((participant) => participant.id === id)) {
      setSelectedParticipants(
        selectedParticipants.filter((participant) => participant.id !== id)
      );
    } else {
      const newParticipant = [...friends, ...groups].find(
        (participant) => participant.id === id
      );
      setSelectedParticipants([...selectedParticipants, newParticipant]);
    }
  };

  const handleSave = () => {
    navigation.navigate("NewEventScreen", {
      selectedParticipants, // Pass the updated participants
      ...route.params, // Include all other fields from route.params
    });
  };

  const handleBack = () => {
    // navigation.navigate("NewEventScreen", {
    //   selectedParticipants: route.params?.currentParticipants || [], // Restore the previous state
    //   ...route.params, // Pass all other fields back
    // });
    navigation.goBack()
  };

  return (
    <GradientBackground style={{ flex: 1 }}>
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity
        style={styles.backArrow}
        onPress={handleBack}
      >
        <Ionicons name="arrow-back" size={30} color="#333" />
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>Select Participants</Text>

      {/* Rounded Container */}
      <View style={styles.roundedContainer}>
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

        {/* Toggle Bar with Slider */}
        <View style={styles.toggleContainer}>
          <Animated.View
            style={[
              styles.slider,
              {
                transform: [{ translateX: sliderPosition }],
                width: screenWidth / tabOptions.length - 10,
              },
            ]}
          />
          {tabOptions.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={styles.toggleButton}
              onPress={() => handleTabChange(tab)}
            >
              <Text
                style={[
                  styles.toggleText,
                  activeTab === tab && styles.activeToggleText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Participant List */}
        <FlatList
          data={filteredParticipants}
          keyExtractor={(item) => item.id}
          numColumns={3} // Use this to create a grid
          contentContainerStyle={styles.listContainer} // Adjust styles for grid layout
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.participantContainer}
              onPress={() => toggleSelection(item.id)}
            >
              <View>
                <Image source={item.image} style={styles.participantImage} />
                {selectedParticipants.some(
                  (participant) => participant.id === item.id
                ) && (
                  <View style={styles.overlay}>
                    <Ionicons
                      name="checkmark-circle"
                      size={30}
                      color="#3fb59e"
                    />
                  </View>
                )}
              </View>
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
    </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3fb59e",
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
    textAlign: "center",
    marginTop: 50,
    marginBottom: 10,
    color: "#333",
  },
  roundedContainer: {
    flex: 1,
    top: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 16,
    alignItems: "stretch",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "relative",
    marginBottom: 10,
  },
  slider: {
    position: "absolute",
    bottom: 0,
    height: 3,
    backgroundColor: "#3fb59e",
    borderRadius: 2,
    textAlign: "center",
  },
  toggleButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  toggleText: {
    fontSize: 16,
    color: "#333",
  },
  activeToggleText: {
    color: "#3fb59e",
    fontWeight: "bold",
  },
  listContainer: {
    paddingHorizontal: 0,
    justifyContent: "space-between",
  },
  participantContainer: {
    alignItems: "center",
    margin: 5,
    width: screenWidth / 3 - 20,
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
    bottom: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 40,
  },
  participantName: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#3fb59e",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
    marginBottom: 50,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SelectParticipantsScreen;
