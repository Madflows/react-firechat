import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

// Components
import Button from "./components/Button";
import Channel from "./components/Channel";

const firebaseConfig = {
  apiKey: "AIzaSyAjBTpDeYqqLfSyeJLO2wdEPOJKiLnRkpg",
  authDomain: "react-firechat-ab49a.firebaseapp.com",
  projectId: "react-firechat-ab49a",
  storageBucket: "react-firechat-ab49a.appspot.com",
  messagingSenderId: "337888528995",
  appId: "1:337888528995:web:ea94b7669c786030564656",
  measurementId: "G-TBMYQCMYJ7",
};

// Initializing services
initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null);
      if (initializing) {
        setInitializing(false);
      }
    });

    // cleanup subscribtion
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    auth.useDeviceLanguage();

    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.log(err.message());
    }
  };

  if (initializing) return "Loading...";

  const signOut = () => {
    auth.signOut().then(
      () => {
        console.log("signed out")
      }
    ).catch((err) => console.log(err.message))
  }
  
  return (
    <div>
      {user ? (
        <>
        <Button onClick={signOut}>Sign Out</Button>
        <h1>Welcome to the chat</h1>
        <Channel user={user} db={db} />
        </>
      ) : (
        <Button onClick={signInWithGoogle}>Sign In with Google</Button>
      )}
    </div>
  );
}

export default App;
