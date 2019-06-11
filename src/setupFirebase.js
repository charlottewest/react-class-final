import firebase from 'firebase';
// Required for side-effects
import 'firebase/firestore';

// TODO: #1 Initialize Firebase
// Initialize Cloud Firestore + auth through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDN0dliImXrcO3omyvO8WYkFaKUoe2xmRY",
  authDomain: "media-manager-7c983.firebaseapp.com",
  databaseURL: "https://media-manager-7c983.firebaseio.com",
  projectId: "media-manager-7c983",
  storageBucket: "media-manager-7c983.appspot.com",
  messagingSenderId: "381293511771",
  appId: "1:381293511771:web:b00de2e8934d7b48"
});
