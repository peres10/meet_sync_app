import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import GradientBackground from "./components/GradientBackground";
import NavBar from "./components/NavBar";

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            {/****** MAIN NAVIGATION OF THE APP ******/}
            <Stack.Screen
              name="MainApp"
              children={() => <NavBar onLogout={() => setIsLoggedIn(false)} />}
            />
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
                  <RegisterScreen
                    {...props}
                    onLogin={() => setIsLoggedIn(true)}
                  />
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
