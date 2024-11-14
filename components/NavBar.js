// components/NavBar.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GradientBackground from "./GradientBackground";
import HomeScreen from "../screens/HomeScreen";
import FriendsScreen from "../screens/FriendsScreen";
import GroupsScreen from "../screens/GroupsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import CustomFooter from "./CustomFooter";
import EditProfileScreen from "../screens/EditProfile";

const Stack = createStackNavigator();

const MainScreens = () => (
  <GradientBackground style={{ flex: 1 }}>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Friends" component={FriendsScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Groups" component={GroupsScreen} />
    </Stack.Navigator>
    <CustomFooter />
  </GradientBackground>
);

const ProfileScreenWithFooter = () => (
  <GradientBackground style={{ flex: 1 }}>
    <ProfileScreen />
    <CustomFooter />
  </GradientBackground>
);

const EditProfileScreenWithFooter = () => (
  <GradientBackground style={{ flex: 1 }}>
    <EditProfileScreen />
    <CustomFooter />
  </GradientBackground>
);

const FriendsScreenWithFooter = () => (
  <GradientBackground style={{ flex: 1 }}>
    <FriendsScreen />
    <CustomFooter />
  </GradientBackground>
);

const GroupsScreenWithFooter = () => (
  <GradientBackground style={{ flex: 1 }}>
    <GroupsScreen />
    <CustomFooter />
  </GradientBackground>
);

const NavBar = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainScreens} />
      <Stack.Screen name="Profile" component={ProfileScreenWithFooter} />
      <Stack.Screen name="EditProfile" component={EditProfileScreenWithFooter} />
      <Stack.Screen name="Friends" component={FriendsScreenWithFooter} />
      <Stack.Screen name="Groups" component={GroupsScreenWithFooter} />
      <Stack.Screen name="Notifications">
        {(props) => (
          <GradientBackground>
            <NotificationsScreen {...props} />
          </GradientBackground>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default NavBar;
