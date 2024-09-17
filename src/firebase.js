import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApthj0Q9VKp659u6IRUPBsahOx4wJmbCM",
  authDomain: "car-rental-app-2dbd6.firebaseapp.com",
  projectId: "car-rental-app-2dbd6",
  storageBucket: "car-rental-app-2dbd6.appspot.com",
  messagingSenderId: "369801722630",
  appId: "1:369801722630:web:acae2b00f28e2777db3c87",
  measurementId: "G-73E86TLR3F"
};


const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;
