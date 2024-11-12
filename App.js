// App.js
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GradientBackground from "./components/GradientBackground";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import NavBar from "./components/NavBar"; // Bottom tab navigator with main screens
import ProfileScreen from "./screens/ProfileScreen";
import NotificationsScreen from "./screens/NotificationsScreen";

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        {/* Splash Screen with Gradient */}
        <Stack.Screen name="Splash">
          {(props) => (
            <GradientBackground>
              <SplashScreen {...props} />
            </GradientBackground>
          )}
        </Stack.Screen>

        {/* Login Screen with Gradient */}
        <Stack.Screen name="Login">
          {(props) => (
            <GradientBackground>
              <LoginScreen {...props} />
            </GradientBackground>
          )}
        </Stack.Screen>

        {/* Register Screen with Gradient */}
        <Stack.Screen name="Register">
          {(props) => (
            <GradientBackground>
              <RegisterScreen {...props} />
            </GradientBackground>
          )}
        </Stack.Screen>

        {/* Main NavBar (Bottom Tab Navigation) with Gradient */}
        <Stack.Screen name="NavBar">
          {(props) => (
            <GradientBackground>
              <NavBar {...props} />
            </GradientBackground>
          )}
        </Stack.Screen>

        {/* Profile and Notifications Screens with Gradient */}
        <Stack.Screen name="Profile">
          {(props) => (
            <GradientBackground>
              <ProfileScreen {...props} />
            </GradientBackground>
          )}
        </Stack.Screen>
        <Stack.Screen name="Notifications">
          {(props) => (
            <GradientBackground>
              <NotificationsScreen {...props} />
            </GradientBackground>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      marginTop: 48,
  },
  text: {
      fontWeight:"bold",
      textAlign:"center",
      fontSize:24,
  },
  button_text: {
      textAlign:"center",
      fontSize:24,
      color:"#1976d2"
  },
  button_container: {
      borderRadius: 15,
      flexDirection: "row",
      margin: 16,
      padding:24,
      justifyContent:"center",
      backgroundColor:"#e6e6e6"
  },
})

export default App;
