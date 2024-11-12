// screens/SplashScreen.js
import React, { useEffect } from "react";
import { View, Text, Dimensions, Image, StyleSheet } from "react-native";
import Button from "../components/Button";
import { commonStyles } from "../styles/commonStyles";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SplashScreen = ({ navigation }) => {
  const { width: screenWidth } = Dimensions.get("window");
  return (
    <View style={commonStyles.container}>
      <Image
        source={require("../assets/logo_png_no_color.png")}
        style={styles.logo}
      />
      <View style={styles.bottomBox}>
        <Text style={styles.titleText}>Meet & Sync</Text>
        <Button
          title="Login"
          onPress={() => navigation.navigate("Login")}
          style={{ width: screenWidth * 0.8 }}
        />
        <Button
          title="Register"
          onPress={() => navigation.navigate("Register")}
          style={{ width: screenWidth * 0.8 }}
        />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
  },
  logo: {
    maxWidth: 350,
    maxHeight: 350,
    marginTop: 50,
  },
  bottomBox: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: screenWidth,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    height: screenHeight * 0.45,
    justifyContent: "center",
  },
});
