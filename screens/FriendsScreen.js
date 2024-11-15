// screens/FriendsScreen.js
import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import Button from "../components/Button";
import Icon from "react-native-vector-icons/Ionicons";
import { commonStyles, screenHeight, screenWidth } from "../styles/commonStyles";

const FriendsScreen = ({ navigation, isHiddenVisible, toggleHiddenElement }) => {
  return (
    <View style={commonStyles.container}>
      <TouchableOpacity
        style={styles.backButton} 
        onPress={() =>
          navigation.goBack()
        }
      >
        <Icon name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <Text style={styles.titleText}>Friends</Text>
      <TextInput style={styles.input} placeholder="Search Friends" />
      <View style={styles.content_box}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  content_box: {
    width: screenWidth,
    height: screenHeight * 0.90,
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.40)",
    borderRadius: 67,
  },
  titleText: {
    marginTop: "10%",
    fontSize: 35,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  input: {
    fontSize: 15,
    padding: 15,
    width: "95%",
    borderRadius: 12,
    marginBottom: "5%",
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: "8%",
    left: "10%",
  },
});

export default FriendsScreen;
