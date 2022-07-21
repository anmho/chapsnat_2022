import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { db, auth } from "../services/firebase";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function handleSubmit() {
    console.log("handle submit envoked!!");

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        auth.currentUser = user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        consoel.log(errorMessage);
      });

    if (auth.currentUser) {
      console.log("Creating user data document");

      await setDoc(doc(db, "Users", auth.currentUser.uid), {
        name: email,
        chats: [],
      });
    }
  }

  return (
    <>
      <Text style={styles.bigBlue}>Signup Here</Text>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#003f5c"
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          handleSubmit();

          // {
          //   /* Try to Sign up the user */
          //   /* what do you think will go here? */
          //   /* Success -> home screen */
          //   /* Failure -> stay, error message */
          // }
        }}
      >
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Log In</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  redirectBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "grey",
    color: "white",
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  bigBlue: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
    padding: 50,
  },
});
