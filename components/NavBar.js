import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GradientBackground from "./GradientBackground";
import HomeScreen from "../screens/HomeScreen";
import EventsScreen from "../screens/EventsScreen";
import GroupsScreen from "../screens/GroupsScreen";
import FriendsScreen from "../screens/FriendsScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import CustomFooter from "./CustomFooter";
import AddButton from "./AddButton"; // Import AddButton component

const Stack = createStackNavigator();

const NavBar = ({ navigation }) => {
  const [isHomeHiddenVisible, setIsHomeHiddenVisible] = useState(false);

  // Function to explicitly hide the hidden element
  const hideHiddenElement = () => setIsHomeHiddenVisible(false);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Home Screen with AddButton */}
      <Stack.Screen
        name="Home"
        children={(props) => (
          <GradientBackground style={{ flex: 1 }}>
            <HomeScreen
              {...props}
              isHiddenVisible={isHomeHiddenVisible}
              toggleHiddenElement={() =>
                setIsHomeHiddenVisible(!isHomeHiddenVisible)
              }
              hideHiddenElement={hideHiddenElement} // Pass the hide function
            />
            <AddButton
              source={require("../assets/plus.png")}
              onPress={() => setIsHomeHiddenVisible(!isHomeHiddenVisible)}
            />
            <CustomFooter />
          </GradientBackground>
        )}
      />

      {/* Notifications Screen with AddButton */}
      <Stack.Screen
        name="Notifications"
        children={(props) => (
          <GradientBackground style={{ flex: 1 }}>
            <NotificationsScreen {...props} />
            <AddButton
              source={require("../assets/favicon.png")}
              onPress={() => props.navigation.navigate("Home")} // Navigate to Notifications screen
            />
            <CustomFooter />
          </GradientBackground>
        )}
      />

      {/* Events Screen with AddButton */}
        <Stack.Screen
        name="Events"
        children={(props) => (
          <GradientBackground style={{ flex: 1 }}>
            <EventsScreen {...props} />
            <AddButton
              source={require("../assets/favicon.png")}
              onPress={() => props.navigation.navigate("Home")} // Navigate to Notifications screen
            />
            <CustomFooter />
          </GradientBackground>
        )}
      />

      {/* Friends Screen with AddButton */}
      <Stack.Screen
        name="Friends"
        children={(props) => (
          <GradientBackground style={{ flex: 1 }}>
            <FriendsScreen {...props} />
            <AddButton
              source={require("../assets/favicon.png")}
              onPress={() => props.navigation.navigate("Home")} // Navigate to Notifications screen
            />
            <CustomFooter />
          </GradientBackground>
        )}
      />

      {/* Groups Screen with AddButton */}
      <Stack.Screen
        name="Groups"
        children={(props) => (
          <GradientBackground style={{ flex: 1 }}>
            <GroupsScreen {...props} />
            <AddButton
              source={require("../assets/favicon.png")}
              onPress={() => props.navigation.navigate("Home")} // Navigate to Home screen
            />
            <CustomFooter />
          </GradientBackground>
        )}
      />
    </Stack.Navigator>
  );
};

export default NavBar;
