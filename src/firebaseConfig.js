import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAP8oqL8QY6GegFD7qIH4m3sIQs-7OLzMI",
    authDomain: "typing-test-6ca44.firebaseapp.com",
    projectId: "typing-test-6ca44",
    storageBucket: "typing-test-6ca44.appspot.com",
    messagingSenderId: "280963803535",
    appId: "1:280963803535:web:dd16a476d008325393c3fa",
    measurementId: "G-XQJ3BYHK39"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth  = firebase.auth();
const db = firebase.firestore();

export {auth,db};