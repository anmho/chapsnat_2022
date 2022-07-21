import React, { useState, useCallback, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Bubble } from "react-native-gifted-chat";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";

export default function HomeScreen({ navigation }) {
  const { userData } = useAuthentication();
  // const { user, userData } = useAuthentication();

  const user = auth.currentUser;

  // console.log(user.email, "<--- from use auth in homescreen");
  // console.log(user2.email, "<--- user from auth in the home screen");
  // console.log(userData, "<--- userdata in the home screen");

  if (user !== null) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => {
            signOut(auth)
              .then(() => {
                // Sign-out successful.
                user = null;
              })
              .catch((error) => {
                // An error happened.
                // should we do something with that error??
                console.log(error.id);
                console.log(error.message);
              });
          }}
        >
          <Text style={styles.loginText}>sign out</Text>
        </TouchableOpacity>
        <Text>Hello, {user.email}! </Text>
        {/* {userData ? (
          userData.chats.map((chatId) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Chat", { chatId: chatId })}
            >
              <Text style={styles.item}>Chat</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>Empty</Text>
        )} */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Chat", { chatId: "mysecondchat" })
          }
        >
          <Text style={styles.item}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Chat", { chatId: "myfirstchat" })}
        >
          <Text style={styles.item}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Chat", { chatId: "myfirstchat" })}
        >
          <Text style={styles.item}>Chat</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (user === null) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.item}>login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.item}>signup</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoutBtn: {
    width: "50%",
    borderRadius: 25,
    margin: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: "yellow",
    borderRadius: 25,
    margin: 20,
  },
});
