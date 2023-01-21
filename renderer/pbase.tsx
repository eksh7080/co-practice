import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCBoK72FmERHSRe-VHvQQVdxqaWe1azpJg",
  authDomain: "fire-d5f54.firebaseapp.com",
  projectId: "fire-d5f54",
  storageBucket: "fire-d5f54.appspot.com",
  messagingSenderId: "266934569518",
  appId: "1:266934569518:web:079785be9ae6abb2a52dbf",
};

const app = initializeApp(firebaseConfig);

// const fconfig = !getApp() ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
