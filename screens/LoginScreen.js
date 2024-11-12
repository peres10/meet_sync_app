// screens/LoginScreen.js
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Button from "../components/Button";
import { commonStyles } from "../styles/commonStyles";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.titleText}>Login</Text>
      <TextInput style={commonStyles.input} placeholder="Username" />
      <TextInput style={commonStyles.input} placeholder="Password" secureTextEntry />
      <Button title="Login" onPress={() => navigation.navigate("NavBar")} />
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={commonStyles.linkText}>Don’t have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
