import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  
  apiKey: "AIzaSyDquGwiLwMiZEglCPVdz4HEXPOuHsyWnmk",
  authDomain: "food-app-d7375.firebaseapp.com",
  projectId: "food-app-d7375",
  storageBucket: "food-app-d7375.appspot.com",
  messagingSenderId: "937980036165",
  appId: "1:937980036165:web:1b65f5eafd7f5069534f2c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
