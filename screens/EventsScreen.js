// screens/EventsScreen.js
import React from "react";
import { View, Text, TextInput } from "react-native";
import Button from "../components/Button";
import { commonStyles } from "../styles/commonStyles";

const EventsScreen = ({ navigation }) => {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.titleText}>Events</Text>
      <TextInput style={commonStyles.input} placeholder="Search Events" />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

export default EventsScreen;
