import firebase from 'firebase/compat/app';
import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCT5N58qQQMERsPypd0_QTIQRZ-k3d7pcg",
    authDomain: "clone-74962.firebaseapp.com",
    projectId: "clone-74962",
    storageBucket: "clone-74962.appspot.com",
    messagingSenderId: "29334473500",
    appId: "1:29334473500:web:27b3ffb5bd858c502948d9",
    measurementId: "G-T166K9JYTY"
};

const firebaseapp = firebase.initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();



