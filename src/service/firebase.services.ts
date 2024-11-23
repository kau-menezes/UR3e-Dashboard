// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDmJLy9G9E6UGmJTy-2dfXJfRB8Kz1Jqtw",
    authDomain: "ur3e-dashboard.firebaseapp.com",
    databaseURL: "https://ur3e-dashboard-default-rtdb.firebaseio.com",
    projectId: "ur3e-dashboard",
    storageBucket: "ur3e-dashboard.firebasestorage.app",
    messagingSenderId: "803272173220",
    appId: "1:803272173220:web:e3848ddb46c0c6c519e831",
    measurementId: "G-6TRXYCXYJL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
