// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8mOtQ9OA2P90bkPN5wS5aS95Ugf6FPbI",
  authDomain: "chapsnat-75028.firebaseapp.com",
  projectId: "chapsnat-75028",
  storageBucket: "chapsnat-75028.appspot.com",
  messagingSenderId: "1010042796475",
  appId: "1:1010042796475:web:cbfdb9f3005d9dc849ac9e",
  measurementId: "G-5SR84C6PW9",
};
// const firebaseConfig = {
//   apiKey: "AIzaSyC7CQwBSzjC_tlEiMd2Mc8Sh9Fb_Cwc1p8",
//   authDomain: "chapsnat-3f4f7.firebaseapp.com",
//   projectId: "chapsnat-3f4f7",
//   storageBucket: "chapsnat-3f4f7.appspot.com",
//   messagingSenderId: "239440555368",
//   appId: "1:239440555368:web:d7d431a3733e778d273add",
//   measurementId: "G-W4Y70B8JL2",
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

const firebase = { app, analytics, db };
export default firebase;
