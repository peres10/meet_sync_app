import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { eventStyles as styles } from "../styles/commonStyles";
import { useNavigation } from "@react-navigation/native";

const EventsListComponent = () => {
  const navigation = useNavigation();

  const [events, setEvents] = useState([
    { id: "3", title: "Networking Event", date: "2024-11-15", details: "An opportunity to meet and connect with industry professionals.", location: "Downtown Convention Center" },
    { id: "4", title: "Workshop", date: "2024-11-20", details: "A hands-on workshop focused on improving skill sets in various areas.", location: "City Library Hall" },
    { id: "5", title: "Client Presentation", date: "2024-11-25", details: "A presentation for our clients, showcasing the latest project developments.", location: "Client HQ" },
    { id: "6", title: "Office Party", date: "2024-11-30", details: "An office celebration to mark the holiday season and team achievements.", location: "Main Office - Rooftop" },
    { id: "7", title: "Team Offsite", date: "2024-12-05", details: "A day out of the office for team-building activities and strategic planning.", location: "Lakeside Resort" },
    { id: "8", title: "New Project Kickoff", date: "2024-12-10", details: "Kickoff meeting for a new exciting project, discussing goals and timelines.", location: "Conference Room A" },
    { id: "9", title: "Year-end Review", date: "2024-12-15", details: "A year-end review to assess team performance, set new goals, and discuss improvements.", location: "Boardroom" },
  ]);

  // Function to calculate the number of days left until the event
  const getDaysLeft = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    const differenceInTime = event.getTime() - today.getTime();
    const daysLeft = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return daysLeft >= 0 ? daysLeft : 0;
  };

  // Function to delete an event
  const deleteEvent = (eventId) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Events")}>
          <Text style={styles.headerText}>Upcoming Events</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.eventItem}
            onPress={() =>
              navigation.navigate("EventDetail", {
                eventTitle: item.title,
                eventDate: item.date,
                eventDetails: item.details,
                eventLocation: item.location,
                eventId: item.id,
                deleteEvent, // Pass the delete function as a prop
              })
            }
          >
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
              in <Text style={styles.daysNumber}>{getDaysLeft(item.date)}</Text> days
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default EventsListComponent;
