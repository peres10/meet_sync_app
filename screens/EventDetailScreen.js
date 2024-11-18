import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { commonStyles, screenHeight, screenWidth } from "../styles/commonStyles";

const EventDetailScreen = ({ route, navigation }) => {
  const { eventTitle, eventDate } = route.params;

  // Calculate days left until the event
  const getDaysLeft = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    const differenceInTime = event.getTime() - today.getTime();
    const daysLeft = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return daysLeft >= 0 ? daysLeft : 0;
  };

  const daysLeft = getDaysLeft(eventDate);

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
        <Text style={styles.descriptionText}>
          Event Date:{" "}
          {new Date(eventDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Text>
        <Text style={styles.descriptionText}>
          Days Left: {daysLeft} day{daysLeft !== 1 ? "s" : ""}
        </Text>
        <Text style={styles.detailsText}>
          This is a placeholder for additional details about the "{eventTitle}" event. You can add more information here if needed.
        </Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    marginTop: "15%",
    fontSize: 35,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  descriptionText: {
    fontSize: 18,
    textAlign: "center",
    color: "#333",
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginTop: 20,
  },
  backButton: {
    position: "absolute",
    top: "6%",
    left: "10%",
  },
});

export default EventDetailScreen;
