import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBIPM5BKCRFDoBfw6T0Nj2LLq9SuJI2_0U",
  authDomain: "twitter-e5c90.firebaseapp.com",
  projectId: "twitter-e5c90",
  storageBucket: "twitter-e5c90.appspot.com",
  messagingSenderId: "347943647169",
  appId: "1:347943647169:web:8f1f4fa38bba76276ba140",
  measurementId: "G-R74EYF003S"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
export default auth 