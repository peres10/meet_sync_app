import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GradientBackground from "./GradientBackground";
import HomeScreen from "../screens/HomeScreen";
import EventsScreen from "../screens/EventsScreen";
import GroupsScreen from "../screens/GroupsScreen";
import FriendsScreen from "../screens/FriendsScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import CustomFooter from "./CustomFooter";
import ProfileScreen from "../screens/ProfileScreen";
import AddButton from "./AddButton";
import EditProfileScreen from "../screens/EditProfile";
import NewEventScreen from "../screens/NewEventScreen";
import AddParticipantsScreen from "../screens/SelectParticipantsScreen";

const Stack = createStackNavigator();

const ProfileScreenWithFooter = ({ onLogout }) => (
  <GradientBackground style={{ flex: 1 }}>
    <ProfileScreen onLogout={onLogout} />
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

const MainScreens = (props) => {
  const [isHomeHiddenVisible, setIsHomeHiddenVisible] = useState(false);
  const [isAddButtonVisible, setIsAddButtonVisible] = useState(true); // State for AddButton visibility

  // Function to explicitly hide the hidden element
  const hideHiddenElement = () => setIsHomeHiddenVisible(false);

  // Function to show AddButton again
  const showAddButton = () => setIsAddButtonVisible(true);

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
                hideHiddenElement={() => {
                  hideHiddenElement();
                  showAddButton(); // Show AddButton when hidden element is closed
                }}
                showAddButton={showAddButton} // Pass the showAddButton function
              />
              {isAddButtonVisible && (
                <AddButton
                  name={"add"}
                  onPress={() => {
                    setIsHomeHiddenVisible(!isHomeHiddenVisible);
                    setIsAddButtonVisible(false); // Hide the AddButton on press
                  }}
                />
              )}
              <CustomFooter />
            </>
          )}
        />
<Stack.Screen
        name="Notifications"
        children={(props) => (
          <GradientBackground style={{ flex: 1 }}>
            <NotificationsScreen {...props} />
            <AddButton
                name={"add"}
                onPress={() => props.navigation.navigate("Home")}
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
                name={"add"}
                onPress={() => props.navigation.navigate("NewEventScreen")}
            />
            <CustomFooter />
          </GradientBackground>
        )}
      />

    {/* <Stack.Screen
        name="NewEventScreen"
        children={(props) => (
          <GradientBackground style={{ flex: 1 }}>
            <NewEventScreen {...props} />
            <CustomFooter />
          </GradientBackground>
        )}
      /> */}

      {/* Friends Screen with AddButton */}
      <Stack.Screen
        name="Friends"
        children={(props) => (
          <GradientBackground style={{ flex: 1 }}>
            <FriendsScreen {...props} />
            <AddButton
                name={"add"}
              onPress={() => props.navigation.navigate("Home")}
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
                name={"add"}
              onPress={() => props.navigation.navigate("Home")}
            />
            <CustomFooter />
          </GradientBackground>
        )}
      />
      </Stack.Navigator>
    </GradientBackground>
  );
};



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

      {/* Notifications Screen with AddButton */}
      <Stack.Screen
        name="Notifications"
        children={(props) => (
          <GradientBackground>
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
      <Stack.Screen name="NewEventScreen" component={NewEventScreen} />
      <Stack.Screen
        name="SelectParticipantsScreen"
        component={AddParticipantsScreen}
      />
    </Stack.Navigator>
  );
};

export default NavBar;
