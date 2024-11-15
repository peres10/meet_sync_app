// AddButton.js
import React from "react";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";

const AddButton = ({ source, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Image source={source} style={styles.image} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 80,      
    right: 20,       
    zIndex: 10,      
    backgroundColor: "#5D8F86",
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "cover",
  },
});

export default AddButton;
