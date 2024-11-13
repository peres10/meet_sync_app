import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Icon library for tab icons
import GradientBackground from "./GradientBackground"; // Gradient wrapper
import HomeScreen from "../screens/HomeScreen";
import EventsScreen from "../screens/EventsScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import FriendsScreen from "../screens/FriendsScreen";
import GroupsScreen from "../screens/GroupsScreen";
import { navBarStyles as styles } from "../styles/commonStyles"; // Custom styles for NavBar, if any

const Tab = createBottomTabNavigator();

const NavBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Assign icons based on route name
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Events") iconName = "calendar";
          else if (route.name === "Friends") iconName = "people";
          else if (route.name === "Groups") iconName = "chatbubbles";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarActiveTintColor: styles.tabBarActiveTintColor,
        tabBarInactiveTintColor: styles.tabBarInactiveTintColor,
      })}
    >
      <Tab.Screen name="Friends">
        {(props) => (
          <GradientBackground>
            <FriendsScreen {...props} />
          </GradientBackground>
        )}
      </Tab.Screen>
      <Tab.Screen name="Notifications">
        {(props) => (
          <GradientBackground>
            <NotificationsScreen {...props} />
          </GradientBackground>
        )}
      </Tab.Screen>
      <Tab.Screen name="Home">
        {(props) => (
          <GradientBackground>
            <HomeScreen {...props} />
          </GradientBackground>
        )}
      </Tab.Screen>
      <Tab.Screen name="Groups">
        {(props) => (
          <GradientBackground>
            <GroupsScreen {...props} />
          </GradientBackground>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default NavBar;
