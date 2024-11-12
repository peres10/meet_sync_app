// screens/ProfileScreen.js
import React from "react";
import { View, Text, TextInput } from "react-native";
import Button from "../components/Button";
import { commonStyles } from "../styles/commonStyles";

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.titleText}>User Profile</Text>
      <TextInput style={commonStyles.input} placeholder="Username" />
      <TextInput style={commonStyles.input} placeholder="Email" />
      <TextInput style={commonStyles.input} placeholder="Phone Number" />
      <TextInput style={commonStyles.input} placeholder="Password" secureTextEntry />
      <Button title="Edit" onPress={() => {}} />
      <Button title="Delete Account" onPress={() => {}} />
      <Button title="Log out" onPress={() => navigation.navigate("Splash")} />
    </View>
  );
};

export default ProfileScreen;
