import firebase from 'firebase/app';
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCHNMxxoGnm7M-_TFjPdMD-o8TCU8GvTIw",
    authDomain: "tp-vue-firebase.firebaseapp.com",
    projectId: "tp-vue-firebase",
    storageBucket: "tp-vue-firebase.appspot.com",
    messagingSenderId: "745332654553",
    appId: "1:745332654553:web:e5db8983d7d666bedb59c8"
};

firebase.initializeApp(firebaseConfig);
export default firebase.database();
