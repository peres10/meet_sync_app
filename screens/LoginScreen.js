// screens/LoginScreen.js
import React from "react";
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import Button from "../components/Button";
import { commonStyles, screenHeight, screenWidth  } from "../styles/commonStyles";


const LoginScreen = ({ navigation }) => {
  return (
    <View style={commonStyles.container}>
      <Image source={require("../assets/logo_png_no_color.png")} style={styles.logo_log_reg}/>
      <View style={styles.content_box}>
        <Text style={styles.titleText}>Login</Text>
        <TextInput style={styles.input} placeholder="Username" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
        <Button style={styles.button} title="Login" onPress={() => navigation.navigate("NavBar")} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.linkText}>Don’t have an account?</Text>
          <Text style={styles.linkText}>Sign up</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  content_box: {
    width:screenWidth,
    height:screenHeight *0.60,
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
    marginBottom: 20,
  },
  input: {
    fontSize:20,
    width: "100%",
    padding:20,
    marginTop:40,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#004d40",
    padding: 20,
    paddingHorizontal:"40%",
    borderRadius: 25,
    alignItems: "center",
    marginTop: 50,
  },
  linkText:{
    alignSelf:"center",
    fontSize:20,
    color:"blue"
  }
})

export default LoginScreen;
