// screens/SplashScreen.js
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Button from "../components/Button";
import { commonStyles } from "../styles/commonStyles";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.titleText}>Meet & Sync</Text>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

export default SplashScreen;
