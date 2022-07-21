import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../services/firebase";

export function useAuthentication() {
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
      auth,
      async (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setUser(user);
          console.log(user.uid);
          const userRef = doc(db, "Users", user.uid);
          const userDataDoc = await getDoc(userRef);
          const userData = userDataDoc.data();
          // console.log(userData);
          setUserData(userData);
        } else {
          // User is signed out
          setUser(undefined);
        }
      }
    );

    return unsubscribeFromAuthStatusChanged;
  }, []);

  return {
    user,
    userData,
  };
}
