// components/EventsComponent.js
import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { eventStyles as styles } from "../styles/commonStyles";

const EventsListComponent = () => {
  // Sample events data
  const [events, setEvents] = useState([
    { id: "3", title: "Networking Event", date: "2024-11-15" },
    { id: "4", title: "Workshop", date: "2024-11-20" },
    { id: "5", title: "Client Presentation", date: "2024-11-25" },
    { id: "6", title: "Office Party", date: "2024-11-30" },
    { id: "7", title: "Team Offsite", date: "2024-12-05" },
    { id: "8", title: "New Project Kickoff", date: "2024-12-10" },
    { id: "9", title: "Year-end Review", date: "2024-12-15" },
  ]);

  // Function to calculate the number of days left until the event
  const getDaysLeft = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    const differenceInTime = event.getTime() - today.getTime();
    const daysLeft = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return daysLeft >= 0 ? daysLeft : 0;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Upcoming Events</Text>
      </View>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.eventDate}>
                {new Date(item.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </Text>
            </View>
            <Text style={styles.daysLeft}>
              in <Text style={styles.daysNumber}>{getDaysLeft(item.date)}</Text>{" "}
              days
            </Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false} // Hide the vertical scrollbar
      />
    </View>
  );
};

export default EventsListComponent;
