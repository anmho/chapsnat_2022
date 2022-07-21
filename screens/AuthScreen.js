import { Dimensions, StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function AuthScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={
          {
            // backgroundColor: "white",
            // width: "100%",
            // height: "10%",
          }
        }
      >
        <Text
          style={{ backgroundColor: "white", width: "100%", height: "10%" }}
        >
          Hello
        </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.loginBtn}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpBtn}>
        <Text>Sign Up</Text>
      </TouchableOpacity> */}
    </View>
  );
}

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFC00",
    height: "10%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loginBtn: {
    width: Dimensions.get("window").width,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f23b57",
  },
  signUpBtn: {
    width: Dimensions.get("window").width,
    height: "10%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0eadff",
  },
});
