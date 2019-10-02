import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA6bxXDUwREJHPBp2AAFG6lK3V86GPhVOs",
  authDomain: "react-e-commerce-59cbb.firebaseapp.com",
  databaseURL: "https://react-e-commerce-59cbb.firebaseio.com",
  projectId: "react-e-commerce-59cbb",
  storageBucket: "",
  messagingSenderId: "700497759563",
  appId: "1:700497759563:web:2b88877c88a349bb1b2cce"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
