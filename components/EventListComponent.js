import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { eventStyles as styles } from "../styles/commonStyles";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const EventsListComponent = () => {
  const navigation = useNavigation();

  // State to hold events data and loading indicator
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch events from Firestore
  const fetchEvents = async () => {
    try {
      const eventsCollection = collection(db, "events"); // Replace "events" with your Firestore collection name
      const snapshot = await getDocs(eventsCollection);
      const eventsList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEvents(eventsList);
    } catch (error) {
      console.error("Error fetching events: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to calculate the number of days left until the event
  const getDaysLeft = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    const differenceInTime = event.getTime() - today.getTime();
    const daysLeft = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return daysLeft >= 0 ? daysLeft : 0;
  };

  // UseEffect to fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Events")}>
          <Text style={styles.headerText}>Upcoming Events</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : (
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
                  fetchEvents: fetchEvents
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
      )}
    </View>
  );
};

export default EventsListComponent;
