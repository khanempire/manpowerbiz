// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH3GEBLpSHQcTkmxLGU0HiWXv3p5ch3Vw",
  authDomain: "urbanservicesprojectfilestore.firebaseapp.com",
  projectId: "urbanservicesprojectfilestore",
  storageBucket: "urbanservicesprojectfilestore.appspot.com",
  messagingSenderId: "832238844419",
  appId: "1:832238844419:web:ea9566edf8115640edac36",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
