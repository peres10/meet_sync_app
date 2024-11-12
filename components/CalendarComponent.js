// components/CalendarComponent.js
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { getDaysInMonth } from "../utils/dateUtils"; // Helper function to get days in a month
import { calendarStyles as styles } from "../styles/commonStyles";

const CalendarComponent = () => {
  const [expanded, setExpanded] = useState(false);
  const animationHeight = useRef(new Animated.Value(70)).current; // Initial height for collapsed state
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const today = date.getDate(); // Get the current day of the month
  const days = getDaysInMonth(date.getMonth() + 1, year); // Array of days in the current month

  const toggleExpand = () => {
    setExpanded(!expanded);

    Animated.timing(animationHeight, {
      toValue: expanded ? 0 : 250, // Target height: 0 when collapsed, 250 when expanded
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View style={[styles.container, { height: animationHeight }]}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={styles.monthText}>
          {month} {year}
        </Text>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.daysContainer}>
          {days.map((day, index) => (
            <View
              key={index}
              style={[styles.day, day === today && styles.currentDay]}
            >
              <Text
                style={[styles.dayText, day === today && styles.currentDayText]}
              >
                {day}
              </Text>
            </View>
          ))}
        </View>
      )}
    </Animated.View>
  );
};

export default CalendarComponent;
