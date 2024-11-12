// screens/RegisterScreen.js
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Button from "../components/Button";
import { commonStyles } from "../styles/commonStyles";

const RegisterScreen = ({ navigation }) => {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.titleText}>Sign Up</Text>
      <TextInput style={commonStyles.input} placeholder="Username" />
      <TextInput style={commonStyles.input} placeholder="Email" />
      <TextInput style={commonStyles.input} placeholder="Password" secureTextEntry />
      <TextInput style={commonStyles.input} placeholder="Phone Number" />
      <Button title="Sign Up" onPress={() => navigation.navigate("Home")} />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={commonStyles.linkText}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
