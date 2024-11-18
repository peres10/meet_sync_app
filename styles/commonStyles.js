// styles/commonStyles.js
import { StyleSheet, Dimensions } from "react-native";

export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;



const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "transparent",
  },
  gradient: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 0, 0, 0.05)", // Optional overlay color for effect
  },
  titleText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#004d40",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

const navBarStyles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "#5c8e85",
    height: 60,
    paddingBottom: 10, // Adjust padding to center icons better
    borderTopWidth: 0, // Remove border
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  tabBarActiveTintColor: "#00c6ff",
  tabBarInactiveTintColor: "#fff",
});

// components/CalendarComponent.js
const calendarStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 4,
    overflow: "hidden",
    marginVertical: 20,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  weekDaysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  weekDayText: {
    width: "14.28%", // 7 columns
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  day: {
    width: "14.28%", // 7 columns
    alignItems: "center",
    paddingVertical: 8,
  },
  dayText: {
    fontSize: 16,
    color: "#333",
  },
  otherMonthDayText: {
    color: "#aaa", // Lighter color for other month days
  },
  currentDay: {
    backgroundColor: "#3fb59e",
    borderRadius: 25,
    padding: 8,
  },
  currentDayText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

// components/EventTComponent.js
const eventStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 4,
    overflow: "hidden",
    marginVertical: 20,
    padding: 10,
    flex: 1,
    width:"100%"
  },
  header: {
    alignItems: "center",
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  listContent: {
    paddingVertical: 10,
  },
  eventItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  eventInfo: {
    flex: 1, // Allows event info to take up available space on the left
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  eventDate: {
    fontSize: 14,
    color: "#666",
  },
  daysLeft: {
    fontSize: 10,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#c6c0be",
    textAlign: "right",
    marginRight: "2%",
  },
  daysNumber: {
    fontSize: 40,
  },
});

export {
  screenWidth,
  screenHeight,
  commonStyles,
  navBarStyles,
  calendarStyles,
  eventStyles,
};
