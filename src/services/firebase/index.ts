import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// import firestore from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBzGJ4DPZA5aOVb5aZLUG6kDVXbXoobICM',
  authDomain: 'thanadsa-admin.firebaseapp.com',
  projectId: 'thanadsa-admin',
  storageBucket: 'thanadsa-admin.appspot.com',
  messagingSenderId: '1050046431665',
  appId: '1:1050046431665:web:d833197152e224c440fd90',
  measurementId: 'G-DRNX4SX7NX',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

export { db, storage };
