// components/CalendarComponent.js
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import { calendarStyles as styles } from "../styles/commonStyles";

const CalendarComponent = () => {
  const minHeight = 70;
  const maxHeight = 300;
  const [expanded, setExpanded] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const animationHeight = useRef(new Animated.Value(minHeight)).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  const monthName = new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" });

  // Calculate number of days in the current month and starting day
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = new Date(currentYear, currentMonth, 1).getDay();

  // Calculate previous month's days to fill at the beginning
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
  const prevMonthFillDays = Array.from(
    { length: startDay },
    (_, i) => prevMonthDays - startDay + i + 1
  );

  // Create array for current month's days
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Calculate next month's days to fill at the end
  const totalDays = prevMonthFillDays.length + currentMonthDays.length;
  const nextMonthFillDays = Array.from(
    { length: totalDays < 42 ? 42 - totalDays : 0 },
    (_, i) => i + 1
  );

  // Combined array of days for the calendar grid
  const calendarDays = [
    ...prevMonthFillDays.map((day) => ({ day, type: "prev" })),
    ...currentMonthDays.map((day) => ({ day, type: "current" })),
    ...nextMonthFillDays.map((day) => ({ day, type: "next" })),
  ];

  const toggleExpand = () => {
    setExpanded(!expanded);

    Animated.timing(animationHeight, {
      toValue: expanded ? minHeight : maxHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(rotation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotateIcon = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  // Update translateX based on swipe
  const onGestureEvent = (event) => {
    translateX.setValue(event.nativeEvent.translationX);
  };

  // Handle swipe release to determine if the month should change
  const handleSwipeEnd = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      const swipeDistance = nativeEvent.translationX;
      const threshold = 100; // Minimum swipe distance to trigger month change

      if (swipeDistance < -threshold) {
        // Swipe left to next month
        animateMonthChange("next");
      } else if (swipeDistance > threshold) {
        // Swipe right to previous month
        animateMonthChange("prev");
      } else {
        // Not enough swipe distance, reset to original position
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const animateMonthChange = (direction) => {
    // Complete the swipe animation and reset position
    const finalPosition = direction === "next" ? -300 : 300;
    Animated.timing(translateX, {
      toValue: finalPosition,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // Reset translation and change the month
      translateX.setValue(0);
      changeMonth(direction);
    });
  };

  const changeMonth = (direction) => {
    if (direction === "next") {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  };

  return (
    <Animated.View style={[styles.container, { height: animationHeight }]}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={styles.monthText}>
          {monthName} {currentYear}
        </Text>
        <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
          <Ionicons name="chevron-forward-outline" size={24} color="#333" />
        </Animated.View>
      </TouchableOpacity>

      {expanded && (
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={handleSwipeEnd}
        >
          <View>
            {/* Weekday Row */}
            <View style={styles.weekDaysContainer}>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                <Text key={index} style={styles.weekDayText}>
                  {day}
                </Text>
              ))}
            </View>

            {/* Calendar Days with Swipe Animation */}
            <Animated.View style={[styles.daysContainer, { transform: [{ translateX }] }]}>
              {calendarDays.map(({ day, type }, index) => (
                <View
                  key={index}
                  style={[
                    styles.day,
                    type === "current" &&
                      day === new Date().getDate() &&
                      currentMonth === new Date().getMonth() &&
                      currentYear === new Date().getFullYear() &&
                      styles.currentDay,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      type === "prev" || type === "next" ? styles.otherMonthDayText : {},
                      type === "current" &&
                        day === new Date().getDate() &&
                        currentMonth === new Date().getMonth() &&
                        currentYear === new Date().getFullYear() &&
                        styles.currentDayText,
                    ]}
                  >
                    {day}
                  </Text>
                </View>
              ))}
            </Animated.View>
          </View>
        </PanGestureHandler>
      )}
    </Animated.View>
  );
};

export default CalendarComponent;
