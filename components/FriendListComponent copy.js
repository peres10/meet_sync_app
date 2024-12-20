import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useUser } from "../context/UserProvider";
import {screenHeight, screenWidth } from "../styles/commonStyles";
import profilePics from "../utils/profilePics";

const FriendListComponent = () => {
  const navigation = useNavigation();
  const { user } = useUser();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, "users");
      const snapshot = await getDocs(usersCollection);

      const usersList = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          username: doc.data().username,
          avatarFile: doc.data().avatarFile,
          email: doc.data().email,
          phoneNumber: doc.data().phoneNumber,
          location: doc.data().location || "N/A", // Fallback if location is not set
          uid: doc.data().uid,
        }))
        .filter((item) => item.uid !== user.uid);

      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.eventItem}
              onPress={() => navigation.navigate("FriendProfile", { user: item })} // Pass user data
            >
              <View style={styles.profileImageContainer}>
                <Image
                  source={profilePics[item.avatarFile] || profilePics.BEAR}
                  style={styles.profileImage}
                />
              </View>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{item.username}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 16,
    alignItems: "stretch",
    width: screenWidth,
  },
  profileImageContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "3%",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
  listContent: {
    paddingVertical: 10,
  },
  eventItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: screenWidth,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default FriendListComponent;
