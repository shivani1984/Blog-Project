import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDmxoW3UQXXfWrPzhQjYFcjwaOzvD8h1Lc",
    authDomain: "blogging-app-3d04c.firebaseapp.com",
    projectId: "blogging-app-3d04c",
    storageBucket: "blogging-app-3d04c.appspot.com",
    messagingSenderId: "155416210892",
    appId: "1:155416210892:web:801c56ded5130611954169",
    measurementId: "G-GQGTJ8RJCH"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app); // This is correct