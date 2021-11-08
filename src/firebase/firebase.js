// Import the functions from the SDKs
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import "firebase/compat/database";


//web app's Firebase configuration
const config = {
    apiKey: "AIzaSyBByBUddjoqRf5mwMP-o4Ueg5jG7RMd9GU",
    authDomain: "react-chat-app-ce948.firebaseapp.com",
    projectId: "react-chat-app-ce948",
    storageBucket: "react-chat-app-ce948.appspot.com",
    messagingSenderId: "911721171669",
    appId: "1:911721171669:web:abe372a4edd0d468cc705c",
    measurementId: "G-07221R6KQR"
  };
  
  // Initialize Firebase
  
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  } else {
    firebase.app();
  }
  
  export const db = firebase.firestore();
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  export const storage = firebase.firestore();
  
  export default firebase;