import { StatusBar } from "expo-status-bar";
import { useState, useCallback, useEffect } from "react";
import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { app, db } from "./services/firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "./screens/ChatScreen";
import HomeScreen from "./screens/HomeScreen";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  arrayUnion,
  setDoc,
  updateDoc,
} from "firebase/firestore/";
import { async } from "@firebase/util";

const Stack = createStackNavigator();

export default function App() {
  const [messages, setMessages] = useState([]);
  console.log(messages);

  useEffect(() => {
    async function getChat() {
      console.log("starting get!");
      const chatsCol = collection(db, "Chats");
      const unsub = await onSnapshot(chatsCol, (chatsDocs) => {
        const chatData = chatsDocs.docs.map((doc) => doc.data());
        console.log("here chatData", chatData);
        setMessages(chatData[0].messages);
      });
      // const chatData = chatsDoc.docs.map((doc) => doc.data());
      // console.log("here chatData", chatData);
      // setMessages(chatData[0].messages);

      // return unsub;
    }

    getChat();

    // const unsub = getChat();
    // return () => unsub();
  }, []);

  const onSend = useCallback(async (chatMessages = []) => {
    console.log(messages, chatMessages);
    await updateDoc(doc(db, "Chats", "myfirstchat"), {
      messages: arrayUnion(chatMessages[0]),
    });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, chatMessages)
    );
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
      {/* <Stack.Navigator>
        <Stack.Screen>
          <ChatScreen />
        </Stack.Screen>
        <Stack.Screen>
          <HomeScreen />
        </Stack.Screen>
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
