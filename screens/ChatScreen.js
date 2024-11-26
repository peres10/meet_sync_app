import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import profilePics from "../utils/profilePics";
import { useUser } from "../context/UserProvider";
import { getColorFromImage } from "../utils/colorUtils";
import { useNavigation } from "@react-navigation/native";

const { width: screenWidth } = Dimensions.get("window");

const ChatScreen = ({ route }) => {
  const navigation = useNavigation(); // Get the navigation object
  const { destinatary } = route.params; // Receiving destinatary object
  const { user } = useUser();

  const [messages, setMessages] = useState([
    { id: "1", text: "Hi there!", sender: "user" },
    { id: "2", text: "Hello! How can I help you?", sender: "destinatary" },
    { id: "3", text: "I was wondering about our schedule.", sender: "user" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now().toString(), text: newMessage, sender: "user" },
    ]);
    setNewMessage("");
  };

  const renderMessage = ({ item }) => {
    const isUser = item.sender === "user";

    // Determine the avatar and color based on sender
    const avatar = isUser
      ? profilePics[user.avatarFile]
      : profilePics[destinatary.avatarFile];

    const borderColor = getColorFromImage(
      isUser ? user.avatarFile : destinatary.avatarFile
    );

    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.destinataryMessage,
        ]}
      >
        {/* Display avatar for sender/receiver */}
        {!isUser && <Image source={avatar} style={styles.avatar} />}
        <View
          style={[
            styles.messageBubble,
            { borderColor, backgroundColor: `${borderColor}20` },
          ]}
        >
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
        {isUser && <Image source={avatar} style={styles.avatar} />}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()} // Navigate back to ProfileScreen
        >
          <Ionicons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        <Image source={destinatary.avatarFile} style={styles.headerAvatar} />
        <Text style={styles.headerUsername}>{destinatary.username}</Text>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesContainer}
      />

      {/* Input Bar */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3fb59e",
    padding: 10,
    paddingTop: 40,
  },
  backArrow: {
    position: "absolute",
    top: 45,
    left: 20,
    zIndex: 10,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerUsername: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  messagesContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 5,
    justifyContent: "space-between",
    maxWidth: "100%",
  },
  userMessage: {
    justifyContent: "flex-end",
  },
  destinataryMessage: {
    justifyContent: "flex-start",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  messageBubble: {
    maxWidth: screenWidth * 0.7,
    padding: 10,
    borderRadius: 15,
    borderWidth: 2,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#f5f5f5",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3fb59e",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatScreen;
