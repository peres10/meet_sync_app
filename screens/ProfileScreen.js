// screens/ProfileScreen.js
import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Button,
  ScrollView,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/UserProvider";
import profilePics from "../utils/profilePics";

// Get the screen width and height
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const ProfileScreen = ({ onLogout }) => {
  const navigation = useNavigation();

  const { user } = useUser();

  // TODO to be deleted
  const friends = [
    {
      id: "1",
      name: "John Doe",
      image: require("../assets/profile_pics/BEAR.webp"),
    },
    {
      id: "2",
      name: "Jane Smith",
      image: require("../assets/profile_pics/OWL.webp"),
    },
    {
      id: "3",
      name: "Alice",
      image: require("../assets/profile_pics/RABBIT.webp"),
    },
    {
      id: "4",
      name: "Bob",
      image: require("../assets/profile_pics/SEAL.webp"),
    },
    {
      id: "5",
      name: "Carol",
      image: require("../assets/profile_pics/BEAR.webp"),
    },
    {
      id: "6",
      name: "Dave",
      image: require("../assets/profile_pics/OWL.webp"),
    },
    {
      id: "7",
      name: "Eve",
      image: require("../assets/profile_pics/RABBIT.webp"),
    },
    {
      id: "8",
      name: "Frank",
      image: require("../assets/profile_pics/SEAL.webp"),
    },
  ];
  // TODO to be deleted
  const groups = [
    {
      id: "1",
      name: "React Devs",
      image: require("../assets/profile_pics/RABBIT.webp"),
    },
    {
      id: "2",
      name: "Music Lovers",
      image: require("../assets/profile_pics/RABBIT.webp"),
    },
    {
      id: "3",
      name: "Art Club",
      image: require("../assets/profile_pics/BEAR.webp"),
    },
    {
      id: "4",
      name: "Hiking Group",
      image: require("../assets/profile_pics/OWL.webp"),
    },
    {
      id: "5",
      name: "Book Club",
      image: require("../assets/profile_pics/SEAL.webp"),
    },
    {
      id: "6",
      name: "Tech Enthusiasts",
      image: require("../assets/profile_pics/RABBIT.webp"),
    },
    {
      id: "7",
      name: "Gaming Buddies",
      image: require("../assets/profile_pics/BEAR.webp"),
    },
    {
      id: "8",
      name: "Movie Fans",
      image: require("../assets/profile_pics/OWL.webp"),
    },
  ];

  // Updated renderMoreIcon to accept a destination
  const renderMoreIcon = (destination) => (
    <TouchableOpacity
      style={styles.moreIconContainer}
      onPress={() => navigation.navigate(destination)}
    >
      <Ionicons name="ellipsis-horizontal" size={35} color="#3fb59e" />
      <Text style={styles.listItemText}>More</Text>
    </TouchableOpacity>  );


  return (
    <ScrollView contentContainerStyle={[styles.container, {alignItems: 'center'}]}>
      {/* Back Arrow Icon */}
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>

      <View style={styles.profileImageContainer}>
        <Image
          source={user.avatarFile ? profilePics[user.avatarFile] : profilePics.BEAR }
          style={styles.profileImage}
        />
      </View>

      <View style={[styles.backgroundContainer, { width: screenWidth }]}>
        {/* User Info with Edit Icon */}
        <View style={styles.userInfo}>
          <View style={styles.userNameContainer}>
            <Text style={styles.userName}>{user.username}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
            >
              <FontAwesome
                name="pencil"
                size={18}
                color="#3fb59e"
                style={styles.editIcon}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.userDetails}>
            <Ionicons name="mail" size={16} /> {user.email}
          </Text>
          <Text style={styles.userDetails}>
            <Ionicons name="location" size={16} />{" "}
            {user.location ? user.location : ""}
          </Text>
        </View>

        {/* Friends List */}
        <Text style={styles.sectionTitle}>Friends:</Text>
        <FlatList
          data={[...friends.slice(0, 7), { id: "more" }]} // Limit to 7 items and add "More" icon
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            item.id === "more" ? (
              renderMoreIcon("Friends") // Navigate to Friends for the friends list
            ) : (
              <TouchableOpacity style={styles.listItem}>
                <Image source={item.image} style={styles.largerCircularImage} />
                <Text style={styles.listItemText}>{item.name}</Text>
              </TouchableOpacity>
            )
          }
          contentContainerStyle={styles.listContainer}
          showsHorizontalScrollIndicator={false}
        />

        {/* Groups List */}
        <Text style={styles.sectionTitle}>Groups:</Text>
        <FlatList
          data={[...groups.slice(0, 7), { id: "more" }]} // Limit to 7 items and add "More" icon
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            item.id === "more" ? (
              renderMoreIcon("Groups") // Navigate to Groups for the groups list
            ) : (
              <TouchableOpacity style={styles.listItem}>
                <Image source={item.image} style={styles.largerCircularImage} />
                <Text style={styles.listItemText}>{item.name}</Text>
              </TouchableOpacity>
            )
          }
          contentContainerStyle={styles.listContainer}
          showsHorizontalScrollIndicator={false}
        />
        <Button style={{}} title="Log Out" onPress={onLogout}></Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    padding: 16,
  },
  backArrow: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  profileImageContainer: {
    alignItems: "center",
    position: "absolute",
    top: 50,
    zIndex: 2,
  },
  profileImage: {
    width: 130, // Larger profile picture
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: "#000",
    backgroundColor: "#fff",
  },
  backgroundContainer: {
    //flex: 1,
    minHeight: screenHeight - 80,  // Set a minimum height
    marginTop: 100,
    paddingTop: 60,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBottom: 100,
  },
  userInfo: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  userNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginRight: 8,
  },
  editIcon: {
    padding: 4,
  },
  userDetails: {
    fontSize: 15,
    color: "#777",
    marginVertical: 2,
    flexDirection: "row",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3fb59e",
    marginBottom: 10,
    alignSelf: "flex-start",
    marginLeft: 16,
  },
  listContainer: {
    alignItems: "center",
    marginLeft: 16,
  },
  listItem: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    width: 90,
  },
  largerCircularImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 5,
  },
  moreIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#e0e0e0",
    marginRight: 25,
    marginBottom: 25,
  },
  listItemText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
});

export default ProfileScreen;
