// screens/FriendsScreen.js
import React from "react";
import { View, Text, TextInput } from "react-native";
import Button from "../components/Button";
import { commonStyles } from "../styles/commonStyles";

const FriendsScreen = ({ navigation }) => {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.titleText}>Friends</Text>
      <TextInput style={commonStyles.input} placeholder="Search Friends" />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

export default FriendsScreen;
