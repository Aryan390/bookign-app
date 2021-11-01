 import firebase from 'firebase';
 
 const firebaseConfig = {
  apiKey: "AIzaSyAaJGfGzJuyXOth8UXna0AZ-yBkS1RezJw",
  authDomain: "cinetime-83266.firebaseapp.com",
  projectId: "cinetime-83266",
  storageBucket: "cinetime-83266.appspot.com",
  messagingSenderId: "1028610363769",
  appId: "1:1028610363769:web:8834b681b440d434509fa8"
};
  // Initialize Firebase
   var fire = firebase.initializeApp(firebaseConfig);

   export default fire;