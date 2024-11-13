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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Get the screen width and height
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const ProfileScreen = ({onLogout}) => {
  const navigation = useNavigation();

  const friends = [
    { id: "1", name: "John Doe", image: require("../assets/profile_pics/BEAR.webp") },
    { id: "2", name: "Jane Smith", image: require("../assets/profile_pics/OWL.webp") },
    { id: "3", name: "Alice", image: require("../assets/profile_pics/RABBIT.webp") },
    { id: "4", name: "Bob", image: require("../assets/profile_pics/SEAL.webp") },
    { id: "5", name: "Carol", image: require("../assets/profile_pics/BEAR.webp") },
    { id: "6", name: "Dave", image: require("../assets/profile_pics/OWL.webp") },
    { id: "7", name: "Eve", image: require("../assets/profile_pics/RABBIT.webp") },
    { id: "8", name: "Frank", image: require("../assets/profile_pics/SEAL.webp") },
  ];

  const groups = [
    { id: "1", name: "React Devs", image: require("../assets/profile_pics/RABBIT.webp") },
    { id: "2", name: "Music Lovers", image: require("../assets/profile_pics/RABBIT.webp") },
    { id: "3", name: "Art Club", image: require("../assets/profile_pics/BEAR.webp") },
    { id: "4", name: "Hiking Group", image: require("../assets/profile_pics/OWL.webp") },
    { id: "5", name: "Book Club", image: require("../assets/profile_pics/SEAL.webp") },
    { id: "6", name: "Tech Enthusiasts", image: require("../assets/profile_pics/RABBIT.webp") },
    { id: "7", name: "Gaming Buddies", image: require("../assets/profile_pics/BEAR.webp") },
    { id: "8", name: "Movie Fans", image: require("../assets/profile_pics/OWL.webp") },
  ];

  const renderMoreIcon = () => (
    <TouchableOpacity
      style={styles.moreIconContainer}
      onPress={() => navigation.navigate("Friends")}
    >
      <Ionicons name="ellipsis-horizontal" size={35} color="#4CAF50" />
      <Text style={styles.listItemText}>More</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image
          source={require("../assets/profile_pics/SEAL.webp")}
          style={styles.profileImage}
        />
      </View>

      <View style={[styles.backgroundContainer, { width: screenWidth }]}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userDetails}>
            <Ionicons name="mail" size={16} /> johndoe@example.com
          </Text>
          <Text style={styles.userDetails}>
            <Ionicons name="location" size={16} /> New York, USA
          </Text>
        </View>

        {/* Friends List */}
        <Text style={styles.sectionTitle}>Friends</Text>
        <FlatList
          data={[...friends.slice(0, 7), { id: "more" }]} // Limit to 7 items and add "More" icon
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            item.id === "more" ? (
              renderMoreIcon() // Render "More" icon at the end
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
        <Text style={styles.sectionTitle}>Groups</Text>
        <FlatList
          data={[...groups.slice(0, 7), { id: "more" }]} // Limit to 7 items and add "More" icon
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            item.id === "more" ? (
              renderMoreIcon() // Render "More" icon at the end
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

        <Button title="temporary log out" onPress={onLogout}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    padding: 16,
  },
  profileImageContainer: {
    alignItems: "center",
    position: "absolute",
    top: 40,
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
    height: screenHeight - 80,
    marginTop: 80,
    paddingTop: 60,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#fff", // Updated background to pure white
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  userInfo: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  userDetails: {
    fontSize: 15,
    color: "#777",
    marginVertical: 2,
    flexDirection: "row",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
    alignSelf: "flex-start",
    marginLeft: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
    alignItems: 'center' // Centers items in case of additional vertical alignment needs
  },
  listItem: {
    alignItems: "center",
    marginRight: 15,
    width: 80,
  },
  largerCircularImage: {
    width: 80, // Increased size for friends and groups images
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  moreIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 80, // Match size of friends and groups images
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e0e0e0",
    marginRight: 15, // Consistent spacing with list items
  },
  listItemText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
});

export default ProfileScreen;
