import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useUser } from "../context/UserProvider";
import { screenWidth } from "../styles/commonStyles";
import profilePics from "../utils/profilePics";

const CombinedFriendsScreen = () => {
  const navigation = useNavigation();
  const { user } = useUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
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
      setFilteredUsers(usersList); // Initially display all users
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Search Query
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredUsers(users); // Show all users if search is empty
    } else {
      const filtered = users.filter((user) =>
        user.username.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Friends</Text>
      {/* Search Bar */}
      <TextInput
        style={styles.input}
        placeholder="Search Friends..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <View style={styles.roundedContainer}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loadingIndicator}
          />
        ) : (
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.participantContainer}
                onPress={() =>
                  // navigation.navigate("ChatScreen", { destinatary: item })
                  navigation.navigate("FriendProfile", { user: item })
                }
              >
                <View>
                  <Image
                    source={profilePics[item.avatarFile] || profilePics.BEAR}
                    style={styles.participantImage}
                  />
                </View>
                <Text style={styles.participantName}>{item.username}</Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3fb59e",
    paddingTop: 40,
    alignItems: "center",
  },
  titleText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    fontSize: 15,
    padding: 15,
    width: "95%",
    borderRadius: 12,
    marginBottom: "5%",
    backgroundColor: "#fff",
  },
  loadingIndicator: {
    marginTop: 20,
  },
  roundedContainer: {
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
  listContainer: {
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
  participantContainer: {
    alignItems: "center",
    margin: 5,
    width: screenWidth / 3 - 20,
  },
  participantImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  participantName: {
    fontSize: 15,
    color: "#333",
    textAlign: "center",
  },
});

export default CombinedFriendsScreen;
