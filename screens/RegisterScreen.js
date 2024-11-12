// screens/RegisterScreen.js
import React from "react";
import { View, Text,Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Button from "../components/Button";
import { commonStyles, screenHeight, screenWidth   } from "../styles/commonStyles";

const RegisterScreen = ({ navigation }) => {
  return (
    <View style={commonStyles.container}>
      <Image source={require("../assets/logo_png_no_color.png")} style={styles.logo_log_reg}/>
      <View style={styles.content_box}>
      <Text style={styles.titleText}>Sign Up</Text>
      <TextInput style={styles.input} placeholder="Username" />
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <TextInput style={styles.input} placeholder="Phone Number" />
      <Button style={styles.button} title="Sign Up" onPress={() => navigation.navigate("Home")} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Already have an account?</Text>
        <Text style={styles.linkText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  content_box: {
    width:screenWidth,
    height:screenHeight *0.62,
    alignItems: "center",
    padding: 20,
    backgroundColor:"rgba(255,255,255,0.5)",
    borderRadius:50
  },
  logo_log_reg: {
    marginTop:"10%",
    height: "25%",
    width:"100%",
    aspectRatio: 1, 
    resizeMode: "contain"
  },
  titleText: {
    marginTop:"5%",
    fontSize: 35,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  input: {
    fontSize:20,
    width: "100%",
    padding:15,
    marginTop:20,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#004d40",
    padding: 20,
    paddingHorizontal:"40%",
    borderRadius: 25,
    marginTop:"10%",
    alignItems: "center",
  },
  linkText:{
    alignSelf:"center",
    fontSize:20,
    color:"blue"
  }
})


export default RegisterScreen;
