import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GradientBackground from "./GradientBackground";
import HomeScreen from "../screens/HomeScreen";
import EventsScreen from "../screens/EventsScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import FriendsScreen from "../screens/FriendsScreen";
import GroupsScreen from "../screens/GroupsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CustomFooter from "./CustomFooter";

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

const ProfileScreenWithFooter = ({onLogout}) => (
  <GradientBackground style={{ flex: 1 }}>
    <ProfileScreen onLogout={onLogout}/>
    <CustomFooter />
  </GradientBackground>
);

const NavBar = ({ onLogout }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainScreens} />
      <Stack.Screen name="Profile" 
        children={() => <ProfileScreenWithFooter onLogout={onLogout}/> }/>
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
