import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore, doc, getDocs, setDoc, query, where, updateDoc, addDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    projectId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    storageBucket: "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    appId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    measurementId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
};

export const app = initializeApp(firebaseConfig);
export const bd = getFirestore(app);
export const autenticacion = getAuth(app);
export const analytics = getAnalytics(app);

//extra
export const Login:Function = signInWithEmailAndPassword;
export const Register:Function = createUserWithEmailAndPassword;

//collection
export const Collection:Function = collection;
export const Doc:Function = doc;
export const SetDoc:Function = setDoc;
export const AddDoc:Function = addDoc;
export const GetDocs:Function = getDocs;
export const UpdateDoc:Function = updateDoc;
export const Query:Function = query;
export const Where:Function = where;
