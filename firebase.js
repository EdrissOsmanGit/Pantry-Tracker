// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEbl_S75pHcdAGvt55B_gW9B6Yez3aAgA",
  authDomain: "inventory-management-e8f59.firebaseapp.com",
  projectId: "inventory-management-e8f59",
  storageBucket: "inventory-management-e8f59.appspot.com",
  messagingSenderId: "947455542183",
  appId: "1:947455542183:web:eca5ca84f31fc786906c82",
  measurementId: "G-VYGHZY25FQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore}