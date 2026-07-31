import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {

apiKey: "AIzaSyBAgTiUtf4k5GgjmKGM76IFh8K3wGII1gY",

authDomain: "iei-nueva-esperanza.firebaseapp.com",

projectId: "iei-nueva-esperanza",

storageBucket: "iei-nueva-esperanza.firebasestorage.app",

messagingSenderId: "505085172930",

appId: "1:505085172930:web:191fd89fef8e418c84ef5b"

};



const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);

export const auth = getAuth(app);



export default app;