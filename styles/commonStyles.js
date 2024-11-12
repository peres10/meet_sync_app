// styles/commonStyles.js
import { StyleSheet } from "react-native";

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
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
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

//NavBar Styles
// const navBarStyles = StyleSheet.create({
//   navBar: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     backgroundColor: "#5c8e85",
//     paddingVertical: 10,
//   },
//   navButton: {
//     alignItems: "center",
//   },
//   icon: {
//     fontSize: 24,
//     color: "#fff",
//   },
//   label: {
//     color: "#fff",
//     fontSize: 12,
//     marginTop: 4,
//   },
// });

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
    alignItems: "center",
    paddingVertical: 10,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  day: {
    width: "14.28%", // Seven columns for each day of the week
    alignItems: "center",
    paddingVertical: 8,
  },
  dayText: {
    fontSize: 16,
    color: "#333",
  },
  currentDay: {
    backgroundColor: "#00c6ff", // Circle color for the current day
    borderRadius: 20, // Circle background
    padding: 8,
  },
  currentDayText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export { commonStyles, navBarStyles, calendarStyles };
