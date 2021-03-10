import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDlRNNN0e_u43LrOjnI546xcrfQYY_pHSo",
    authDomain: "clone-fe45f.firebaseapp.com",
    projectId: "clone-fe45f",
    storageBucket: "clone-fe45f.appspot.com",
    messagingSenderId: "151648085383",
    appId: "1:151648085383:web:9150e5363b6c3505405f22"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };