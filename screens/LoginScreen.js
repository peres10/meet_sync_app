import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import Button from "../components/Button";
import {
  commonStyles,
  screenHeight,
  screenWidth,
} from "../styles/commonStyles";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { useUser } from "../context/UserProvider";
import { getDoc, doc } from "firebase/firestore";

const LoginScreen = ({ navigation, onLogin }) => {
  const [email, setEmail] = useState(""); // For storing email input
  const [password, setPassword] = useState(""); // For storing password input

  const { setUser } = useUser();

  const handleLogin = async () => {
    try {
      const userCreds = await signInWithEmailAndPassword(auth, email, password);
      const user = userCreds.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setUser({
          uid: user.uid,
          email: user.email,
          username: userDoc.data().username,
          avatarFile: userDoc.data().avatarFile,
          location: userDoc.data().location ? userDoc.data().location : ""
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
  );
};

const styles = StyleSheet.create({
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
    height: "25%",
    width: "100%",
    aspectRatio: 1,
    resizeMode: "contain",
  },
  titleText: {
    marginTop: "5%",
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
    fontSize: 20,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#004d40",
    padding: 20,
    paddingHorizontal: "40%",
    borderRadius: 25,
    alignItems: "center",
    marginTop: 50,
  },
  linkContainer: {
    position: "absolute",
    bottom: 40, // Adjust this to control the distance from the bottom
    alignSelf: "center",
    alignItems: "center",
  },
  forgotPasswordText: {
    textDecorationLine: "underline",
    color: "#44635D",
    fontSize: 15,
  },
  linkText1: {
    fontSize: 20,
    color: "#303030",
  },
  linkText2: {
    fontSize: 20,
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
