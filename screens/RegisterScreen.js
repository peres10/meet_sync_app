import { React, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Button from "../components/Button";
import {
  commonStyles,
  screenHeight,
  screenWidth,
} from "../styles/commonStyles";
import Icon from "react-native-vector-icons/Ionicons";

import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const RegisterScreen = ({ navigation, onLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      const userCreds = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCreds.user;

      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        createdAt: new Date(),
        uid: user.uid,
      });

      Alert.alert("Registration Successful");
      onLogin();
    } catch (error) {
      Alert.alert("Registration Error", error.message);
    }
  };

  return (
    <View style={commonStyles.container}>
      {/* Back Arrow Button */}
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
        <Text style={styles.titleText}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="username"
            value={username}
            onChangeText={setUsername}
          />
        </View>
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
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="(123) 456-789"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        <Button
          style={styles.button}
          title="Register"
          onPress={handleRegister}
        />
      </View>
      <TouchableOpacity
        style={styles.linkContainer}
        onPress={() =>
          navigation.reset({
            index: 1,
            routes: [{ name: "Splash" }, { name: "Login" }],
          })
        }
      >
        <Text style={styles.linkText1}>Already have an account?</Text>
        <Text style={styles.linkText2}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  content_box: {
    width: screenWidth,
    height: screenHeight * 0.58,
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
    marginBottom: 10,
  },
  inputContainer: {
    width: "90%",
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 2,
  },
  input: {
    fontSize: 20,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#004d40",
    padding: 20,
    paddingHorizontal: "36%",
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
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

export default RegisterScreen;
