import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface ChatScreenProps {
  role: string;
  usernameProp: string;
}

interface Message {
  sender: string;
  content: string;
  type: "CHAT" | "JOIN";
  role: string;
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const ChatScreen = ({ role, usernameProp }: ChatScreenProps) => {
  if (!role || !usernameProp) {
    throw new Error("Both 'role' and 'usernameProp' are required.");
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    const socket = new SockJS(`${apiUrl}/ws`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("Connected to WebSocket");

        stompClient.subscribe("/topic/app", (message) => {
          const receivedMessage: Message = JSON.parse(message.body);
          setMessages((prev) => [...prev, receivedMessage]);
        });

        // Optional: notify server about join event
        // stompClient.publish({
        //   destination: "/app/chat.send",
        //   body: JSON.stringify({
        //     sender: usernameProp,
        //     content: `${usernameProp} đã tham gia.`,
        //     type: "JOIN",
        //     role: role,
        //   }),
        // });

        console.log(`${usernameProp} đã tham gia.`);
      },
      onDisconnect: () => console.log("Disconnected"),
      debug: () => {},
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, [role, usernameProp]);

  const sendMessage = () => {
    if (input.trim() && stompClientRef.current?.connected) {
      //   stompClientRef.current.publish({
      //     destination: "/app/chat.send",
      //     body: JSON.stringify({
      //       sender: usernameProp,
      //       content: input.trim(),
      //       type: "CHAT",
      //       role,
      //     }),
      //   });
      setInput("");
    }
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isMine = item.sender === usernameProp;
    return (
      <View
        style={[
          styles.messageContainer,
          isMine ? styles.myMessage : styles.otherMessage,
        ]}
      >
        <Text style={styles.sender}>
          {item.sender} ({item.role})
        </Text>
        <Text style={styles.content}>{item.content}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        style={styles.chatList}
        contentContainerStyle={{ paddingBottom: 10 }}
        keyboardShouldPersistTaps="handled"
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Nhập tin nhắn..."
          style={styles.input}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f2f6",
  },
  chatList: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    maxWidth: "80%",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  myMessage: {
    backgroundColor: "#d1f7c4",
    alignSelf: "flex-end",
    borderTopRightRadius: 0,
  },
  otherMessage: {
    backgroundColor: "#ffffff",
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
  },
  sender: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 12,
    color: "#57606f",
  },
  content: {
    fontSize: 16,
    color: "#2f3542",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#dcdde1",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ced6e0",
    borderRadius: 20,
    backgroundColor: "#f9f9f9",
  },
  sendButton: {
    backgroundColor: "#2ed573",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
