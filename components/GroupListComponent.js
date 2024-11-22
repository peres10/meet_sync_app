import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useUser } from "../context/UserProvider";
import profilePics from "../utils/profilePics";

const GroupsListComponent = () => {
  const navigation = useNavigation();

  const { user } = useUser();

  // State to hold groups data and loading indicator
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch groups from Firestore
const fetchGroups = async () => {
  try {
    const groupsCollection = collection(db, "groups"); // Replace "groups" with your Firestore collection name
    const snapshot = await getDocs(groupsCollection);
    const groupsList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log("Fetched Groups: ", groupsList);
    setGroups(groupsList); // Save fetched groups to state
  } catch (error) {
    console.error("Error fetching groups: ", error);
  } finally {
    setLoading(false);
  }
};

  // UseEffect to fetch groups on component mount
  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Groups")}>
          <Text style={styles.headerText}>Your Groups</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              
              <TouchableOpacity
              
                style={styles.eventItem}  // Reusing the same eventItem style for group item
                onPress={() =>
                  navigation.navigate("GroupDetail", {
                    title: item.groupName,
                    details: item.description,
                    private: item.isPrivate,
                  })
                }
              >
                            <View style={styles.profileImageContainer}>
              <Image
                source={
                  user.avatarFile
                    ? profilePics[user.avatarFile]
                    : profilePics.BEAR
                }
                style={styles.profileImage}
              />
            </View>
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle}>{item.groupName}</Text>
                  <Text style={styles.eventDate}>{item.membersCount}4 members</Text>
                </View>

                <Text style={styles.daysLeft}>
                <Text
                style={[
                  styles.daysNumber,
                  { color: item.isPrivate ? '#d50000' : '#007BFF' } // Red for private, blue for public
                ]}
              >
                {item.isPrivate ? "Private" : "Public"}
              </Text>

                </Text>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 4,
    overflow: "hidden",
    marginVertical: 20,
    padding: 10,
    flex: 1,
    width: "100%",
  },
  profileImageContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight:"3%"
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
  header: {
    alignItems: "center",
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  listContent: {
    paddingVertical: 10,
  },
  eventItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  eventInfo: {
    flex: 1, 
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  eventDate: {
    fontSize: 14,
    color: "#666",
  },
  daysLeft: {
    fontSize: 10,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#c6c0be",
    textAlign: "right",
    marginRight: "2%",
  },
  daysNumber: {
    fontSize: 15,
    color: "#007BFF",
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default GroupsListComponent;
