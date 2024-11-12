// screens/NotificationsScreen.js
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Button from "../components/Button";
import { commonStyles } from "../styles/commonStyles";

const NotificationsScreen = ({ navigation }) => {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.titleText}>Notifications</Text>
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <TouchableOpacity>
          <Text style={commonStyles.linkText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[commonStyles.linkText, { marginLeft: 20 }]}>Messages</Text>
        </TouchableOpacity>
      </View>
      <TextInput style={commonStyles.input} placeholder="Filter Notifications" />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

export default NotificationsScreen;
