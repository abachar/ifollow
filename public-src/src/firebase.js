import firebase from 'firebase';

// Firebase configuration
const config = {
  apiKey: "AIzaSyCRsBvrWB9d0Hj05jLN259Shq5P4BIoiLc",
  authDomain: "ifollow-a4e73.firebaseapp.com",
  databaseURL: "https://ifollow-a4e73.firebaseio.com",
  projectId: "ifollow-a4e73",
  storageBucket: "ifollow-a4e73.appspot.com",
  messagingSenderId: "450621384838"
};

// Initialize firebase application
const app = firebase.initializeApp(config);

// Get database
export const db = app.database();