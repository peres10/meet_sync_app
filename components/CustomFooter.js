// components/CustomFooter.js
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const CustomFooter = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Define icons and labels for each screen
  const footerTabs = [
    { name: "Friends", icon: "people" },
    { name: "Home", icon: "home" },
    { name: "Groups", icon: "chatbubbles" },
  ];

  return (
    <View style={styles.footer}>
      {footerTabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tab}
          // Navigate to the nested screen within "Main" stack
          onPress={() => navigation.navigate("Main", { screen: tab.name })}
        >
          <Ionicons
            name={tab.icon}
            size={24}
            color={route.name === tab.name ? "#4CAF50" : "gray"}
          />
          <Text style={{ color: route.name === tab.name ? "#4CAF50" : "gray" }}>
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  tab: {
    alignItems: "center",
  },
});

export default CustomFooter;
