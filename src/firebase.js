// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // <-- THIS LINE IS CRUCIAL

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArs5KAG6-WZp5dzUWcnCCDrOLKeHZabxI",
  authDomain: "smart-task-manager-app.firebaseapp.com",
  projectId: "smart-task-manager-app",
  storageBucket: "smart-task-manager-app.firebasestorage.app",
  messagingSenderId: "769305434562",
  appId: "1:769305434562:web:ae5f55ccad42b95cb15e5b",
  measurementId: "G-PD4BCXCCB3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app); // <-- THIS LINE IS CRUCIAL