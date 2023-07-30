// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8KODLXB1g7UEKKqpZEhPTu15Yitk41TU",
  authDomain: "crud2-8d014.firebaseapp.com",
  projectId: "crud2-8d014",
  storageBucket: "crud2-8d014.appspot.com",
  messagingSenderId: "82153794033",
  appId: "1:82153794033:web:4e90d784edf09c390bbc50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}



