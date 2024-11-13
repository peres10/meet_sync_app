import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import GradientBackground from "./components/GradientBackground";
import NavBar from "./components/NavBar";

import { Inter_900Black, useFonts } from "@expo-google-fonts/inter";

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            {/****** MAIN NAVIGATION OF THE APP ******/}
            <Stack.Screen name="Main" component={NavBar} />

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
          </>
        ) : (
          <>
            {/****** NOT LOGGED NAVIGATION OF THE APP ******/}
            <Stack.Screen name="Splash">
              {(props) => (
                <GradientBackground>
                  <SplashScreen {...props} />
                </GradientBackground>
              )}
            </Stack.Screen>

            <Stack.Screen name="Login" options={{ gestureEnabled: false }}>
              {(props) => (
                <GradientBackground>
                  <LoginScreen {...props} onLogin={() => setIsLoggedIn(true)} />
                </GradientBackground>
              )}
            </Stack.Screen>

            <Stack.Screen name="Register" options={{ gestureEnabled: false }}>
              {(props) => (
                <GradientBackground>
                  <RegisterScreen {...props} />
                </GradientBackground>
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
