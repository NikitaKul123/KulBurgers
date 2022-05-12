import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDK24pjptWxdjZui-duwerFbWcjRG4TkN0",
    authDomain: "kulburgers-website.firebaseapp.com",
    projectId: "kulburgers-website",
    storageBucket: "kulburgers-website.appspot.com",
    messagingSenderId: "1011489740804",
    appId: "1:1011489740804:web:4d01be42a49462d361fd51",
    measurementId: "G-2QRPQ5P9RV"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export {auth,fs,storage}