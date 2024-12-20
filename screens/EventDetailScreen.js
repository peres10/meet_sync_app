import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  commonStyles,
  screenHeight,
  screenWidth,
} from "../styles/commonStyles";
import { deleteEvent, leaveEvent } from "../services/events";
import { useUser } from "../context/UserProvider";

const EventDetailScreen = ({ route, navigation }) => {
  const { user } = useUser();

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
  ];

  const groups = [
    {
      id: "5",
      name: "React Devs",
      image: require("../assets/profile_pics/RABBIT.webp"),
    },
    {
      id: "6",
      name: "Music Lovers",
      image: require("../assets/profile_pics/OWL.webp"),
    },
  ];

  const allParticipants = [...friends, ...groups];

  const {
    eventTitle,
    eventDate,
    eventDetails,
    eventId,
    eventLocation,
    eventTime,
    eventCreatorId,
  } = route.params;

  // Calculate days left until the event
  const getDaysLeft = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    const differenceInTime = event.getTime() - today.getTime();
    const daysLeft = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return daysLeft >= 0 ? daysLeft : 0;
  };

  const daysLeft = getDaysLeft(eventDate);

  const isUserEventCreator = user.uid == eventCreatorId;

  // Function to handle delete action
  const handleDeleteOrLeave = async () => {
    Alert.alert(
      isUserEventCreator ? "Delete Event" : "Leave Event",
      `Are you sure you want to ${
        isUserEventCreator ? "delete" : "leave"
      } the event: ${eventTitle}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: isUserEventCreator ? "Delete" : "Leave",
          style: "destructive",
          onPress: async () => {
            try {
              const res = isUserEventCreator
                ? await deleteEvent(user.uid, eventId, eventTitle)
                : await leaveEvent(user.uid, eventId, eventTitle);

              if (!res.success) throw new Error(res.error);

              // Navigate back to the Events List
              navigation.goBack(); // This will reload the previous screen
            } catch (error) {
              console.error("Error deleting/leaving event: ", error);
              Alert.alert(
                "Error",
                "Failed to delete/leave the event. Please try again."
              );
            }
          },
        },
      ]
    );
  };

  return (
    <View style={commonStyles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <Text style={styles.titleText}>{eventTitle}</Text>
      <View style={styles.content_box}>
        <Text style={styles.infoText}>
          {new Date(eventDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </Text>
        <Text style={styles.infoText}>
          In <Text style={styles.daysNumber}>{daysLeft} </Text>
          day{daysLeft !== 1 ? "s" : ""}
        </Text>
        <View style={styles.detail_box}>
          <Text style={styles.detailsText}>{eventDetails}</Text>

          <Text style={styles.participantsText}>Location:</Text>
          <Text style={styles.infoText}> {eventLocation} </Text>

          <Text style={styles.participantsText}>Participants:</Text>
          {/* Display all participants */}
          <FlatList
            data={allParticipants}
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <View style={styles.participant}>
                <Image source={item.image} style={styles.participantImage} />
                <Text style={styles.participantName}>{item.name}</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteOrLeave}
        >
          <Text style={styles.deleteButtonText}>
            {isUserEventCreator ? "Delete" : "Leave"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content_box: {
    width: screenWidth,
    height: screenHeight * 0.7,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.40)",
    borderRadius: 67,
    alignItems: "center",
  },
  detail_box: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.45,
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 20,
    alignItems: "center",
    padding: 15,
  },
  titleText: {
    marginTop: "15%",
    fontSize: 35,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  infoText: {
    fontSize: 25,
    color: "#333",
    textAlign: "center",
  },
  daysNumber: {
    fontSize: 40,
    color: "gray",
    fontWeight: "bold",
  },
  detailsText: {
    fontSize: 18,
    textAlign: "center",
    color: "#555",
    marginTop: 10,
    width: "100%",
    flexWrap: "wrap",
  },
  participantsText: {
    alignSelf: "start",
    fontSize: 20,
    color: "#555",
    marginTop: 20,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    top: "6%",
    left: "10%",
  },
  deleteButton: {
    marginTop: 20,
    backgroundColor: "#ff3b30",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth * 0.6,
    position: "absolute",
    bottom: 30,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  participant: {
    alignItems: "center",
    margin: 10,
  },
  participantImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  participantName: {
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
    color: "#333",
  },
  listContainer: {
    justifyContent: "center",
  },
});

export default EventDetailScreen;
