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
import groupPics from "../utils/groupPics";


const CombinedFriendsScreen = () => {
  const navigation = useNavigation();
  const { user } = useUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [groups, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const groupsCollection = collection(db, "groups");
      const snapshot = await getDocs(groupsCollection);

      const groupList = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          groupName: doc.data().groupName,
          privacy: doc.data().isPrivate,
          description: doc.data().description,
          imageFile: doc.data().imageFile
        }))
        .filter((item) => item.uid !== user.uid);

      setUsers(groupList);
      setFilteredUsers(groupList); // Initially display all users
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
      setFilteredUsers(groups); // Show all groups if search is empty
    } else {
      const filtered = groups.filter((group) =>
        group.groupName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Groups</Text>
      {/* Search Bar */}
      <TextInput
        style={styles.input}
        placeholder="Search Groups..."
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
          numColumns={1}
          contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.participantContainer}
                onPress={() =>
                  navigation.navigate("GroupDetail", { group: item })
                }
              >
                <View>
                  <Image
                    source={groupPics[item.imageFile] || groupPics["MUSIC"]}
                    style={styles.participantImage}
                  />
                </View>
                <Text style={styles.participantName}>{item.groupName}</Text>
                <Text 
                     style={[
                      styles.participantPrivacy,
                      { color: item.privacy ? "#d50000" : "#007BFF" }, // Red for private, blue for public
                    ]}>
                  {item.privacy? "Private" : "Public"}</Text>
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
    width: screenWidth,
  },
  listContainer: {
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
  participantContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  participantImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  participantName: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },
  participantPrivacy: {
    fontSize:20,
    color: "#333",
    textAlign: "center",
  },
});

export default CombinedFriendsScreen;
