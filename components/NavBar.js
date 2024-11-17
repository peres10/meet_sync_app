import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GradientBackground from "./GradientBackground";
import HomeScreen from "../screens/HomeScreen";
import GroupsScreen from "../screens/GroupsScreen";
import FriendsScreen from "../screens/FriendsScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import CustomFooter from "./CustomFooter";
import EditProfileScreen from "../screens/EditProfile";
import AddButton from "./AddButton";

const Stack = createStackNavigator();

const MainScreens = () => {
  const [isHomeHiddenVisible, setIsHomeHiddenVisible] = useState(false);

  // Function to explicitly hide the hidden element
  const hideHiddenElement = () => setIsHomeHiddenVisible(false);

  return (
    <GradientBackground style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          children={() => (
            <>
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
            </>
          )}
        />
        <Stack.Screen name="Friends" component={FriendsScreen} />
        <Stack.Screen name="Groups" component={GroupsScreen} />
      </Stack.Navigator>
      <CustomFooter />
    </GradientBackground>
  );
};

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

const NavBar = ({ onLogout }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainScreens} />
      <Stack.Screen
        name="Profile"
        children={() => <ProfileScreenWithFooter onLogout={onLogout} />}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreenWithFooter}
      />
      <Stack.Screen name="Friends" component={FriendsScreenWithFooter} />
      <Stack.Screen name="Groups" component={GroupsScreenWithFooter} />
      <Stack.Screen name="Notifications">
        {(props) => (
          <GradientBackground>
            <NotificationsScreen {...props} />
          </GradientBackground>
        )}
      </Stack.Screen>

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
