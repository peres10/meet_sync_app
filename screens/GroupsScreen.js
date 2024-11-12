// screens/GroupsScreen.js
import React from "react";
import { View, Text, TextInput } from "react-native";
import Button from "../components/Button";
import { commonStyles } from "../styles/commonStyles";

const GroupsScreen = ({ navigation }) => {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.titleText}>Groups</Text>
      <TextInput style={commonStyles.input} placeholder="Search Groups" />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

export default GroupsScreen;
