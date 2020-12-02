import firebase from "firebase";

// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyBoYB4JvQHlgnUbDOO1XTwBmN10s6Ca7lI",
    authDomain: "library-98f41.firebaseapp.com",
    databaseURL: "https://library-98f41.firebaseio.com",
    projectId: "library-98f41",
    storageBucket: "library-98f41.appspot.com",
    messagingSenderId: "548751956345",
    appId: "1:548751956345:web:3006a59bedef93f0f4b7a8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();