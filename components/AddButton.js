// AddButton.js
import React from "react";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AddButton = ({ source, onPress }) => (
  // <TouchableOpacity onPress={onPress} style={styles.container}>
  //   <Image source={source} style={styles.image} /> 
  // </TouchableOpacity>
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Ionicons
      name = {"add"} size={60} style= {styles.icons}
    >
    </Ionicons>
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
  icons:{
    color:"#e9e9e9",
    alignSelf: "center",
    justifySelf: "center"
  }
});

export default AddButton;