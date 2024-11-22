import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import Button from "../components/Button";
import {
  commonStyles,
  screenHeight,
  screenWidth,
} from "../styles/commonStyles";

import { useUser } from "../context/UserProvider";
import { getUserFromDb, signUser } from "../services/auth";

const LoginScreen = ({ navigation, onLogin }) => {
  const [email, setEmail] = useState(""); // For storing email input
  const [password, setPassword] = useState(""); // For storing password input

  const { setUser } = useUser();

  const handleLogin = async () => {
    try {
      const user = await signUser(email, password);

      const userDoc = await getUserFromDb(user);

      if (userDoc.exists()) {
        setUser({
          uid: user.uid,
          email: user.email,
          username: userDoc.data().username,
          avatarFile: userDoc.data().avatarFile,
          location: userDoc.data().location ? userDoc.data().location : "",
        });

        onLogin();
      } else {
        Alert.alert("Error fetching data");
      }
    } catch (error) {
      Alert.alert("Login Error", "Wrong credentials");
      //Alert.alert(error)
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={commonStyles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Splash" }],
            })
          }
        >
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>

        <Image
          source={require("../assets/logo_png_no_color.png")}
          style={styles.logo_log_reg}
        />

        <View style={styles.content_box}>
          <Text style={styles.titleText}>Login</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="name@example.com"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="********"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={{}}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </View>

          <Button style={styles.button} title="Login" onPress={handleLogin} />
        </View>

        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() =>
            navigation.reset({
              index: 1,
              routes: [{ name: "Splash" }, { name: "Register" }],
            })
          }
        >
          <Text style={styles.linkText1}>Don’t have an account?</Text>
          <Text style={styles.linkText2}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center", // Centers the content when there is extra space
    paddingVertical: 0,
    paddingHorizontal: 16,
  },
  content_box: {
    width: screenWidth,
    height: screenHeight * 0.55,
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.40)",
    borderRadius: 67,
  },
  logo_log_reg: {
    marginTop: "10%",
    height: "20%",
    width: "100%",
    aspectRatio: 1,
    resizeMode: "contain",
  },
  titleText: {
    marginTop: "4%",
    fontSize: 42,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  inputContainer: {
    width: "90%",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 4,
  },
  input: {
    fontSize: 18,
    padding: 18,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#004d40",
    padding: 20,
    paddingHorizontal: "36%",
    borderRadius: 25,
    alignItems: "center",
    marginTop: "6%",
  },
  linkContainer: {
    marginTop: "5%",
    alignSelf: "center",
    alignItems: "center",
  },
  forgotPasswordText: {
    textDecorationLine: "underline",
    color: "#44635D",
    fontSize: 15,
  },
  linkText1: {
    fontSize: 18,
    color: "#303030",
  },
  linkText2: {
    fontSize: 18,
    color: "#303030",
    textDecorationLine: "underline",
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 10,
    padding: 15,
  },
});

export default LoginScreen;
