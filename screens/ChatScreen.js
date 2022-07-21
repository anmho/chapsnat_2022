import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { db } from "../services/firebase";
import { arrayUnion, updateDoc, onSnapshot, doc } from "firebase/firestore";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { Text } from "react-native";

export default function ChatScreen({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const { user, userData } = useAuthentication();

  console.log(userData, "userdata in the chat screen");

  useEffect(() => {
    console.log(messages[0]);
    let unsubscribeFromNewSnapshots = onSnapshot(
      doc(db, "Chats", route.params.chatId),
      (snapshot) => {
        // console.log("New Snapshot! ", snapshot.data().messages[0]);
        setMessages(snapshot.data().messages);
      }
    );

    return function cleanupBeforeUnmounting() {
      unsubscribeFromNewSnapshots();
    };
  }, []);

  const onSend = useCallback((messages = []) => {
    updateDoc(doc(db, "Chats", route.params.chatId), {
      messages: arrayUnion(messages[0]),
    });

    console.log(messages[0]);
  }, []);

  if (user && userData) {
    return (
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          // current "blue bubble" user
          _id: user.uid,
          name: userData.name,
          avatar: "https://placeimg.com/140/140/any",
        }}
        inverted={false}
        showUserAvatar={true}
        renderUsernameOnMessage={true}
      />
    );
  } else if (!(user && userData)) {
    return <Text>Loading...</Text>;
  }
}
