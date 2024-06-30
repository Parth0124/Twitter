// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIPM5BKCRFDoBfw6T0Nj2LLq9SuJI2_0U",
  authDomain: "twitter-e5c90.firebaseapp.com",
  projectId: "twitter-e5c90",
  storageBucket: "twitter-e5c90.appspot.com",
  messagingSenderId: "347943647169",
  appId: "1:347943647169:web:8f1f4fa38bba76276ba140",
  measurementId: "G-R74EYF003S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);