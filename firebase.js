// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="/__/firebase/8.2.1/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="/__/firebase/8.2.1/firebase-analytics.js"></script>

// <!-- Initialize Firebase -->
// <script src="/__/firebase/init.js"></script>


var firebase = require("firebase/app");
require('firebase/database');

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyD_yBImzc5tWwfWfiCR0WWP3Bk0dQpUd2s",
    authDomain: "serial-data-node.firebaseapp.com",
    databaseURL: "https://serial-data-node-default-rtdb.firebaseio.com",
    projectId: "serial-data-node",
    storageBucket: "serial-data-node.appspot.com",
    messagingSenderId: "458814118167",
    appId: "1:458814118167:web:bc9b85b0fd230f83bd3f52",
    measurementId: "G-RNR5VJSD1S"
  };
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  database.ref().on("value", function(snap){
    var temp_data = snap.val().temp;
    console.log(temp_data);
  });


//   function writeUserData(userId) {
//     firebase.database().ref('users/' + userId).set({
//       username: "jawad",
//       email: "mjawad.nust@gmail.com"
      
//     });
//   }
  //writeUserData();
  module.exports = firebase_app;