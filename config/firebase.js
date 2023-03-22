// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import 'firebase/auth';
import Constants from 'expo-constants';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6tMqdP74qZBjzn04OFnyLYb8VcmnBN3Q",
  authDomain: "sportstar-expo-react-native.firebaseapp.com",
  projectId: "sportstar-expo-react-native",
  storageBucket: "sportstar-expo-react-native.appspot.com",
  messagingSenderId: "292352357030",
  appId: "1:292352357030:web:1bec4ed2a1fb653e293a67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;