import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { FaPowerOff } from "react-icons/fa"

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
import Loader from "./components/Loader";
import Switcher from "./components/Switcher";

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

// Message collection reference
const msgRef = collection(db, "messages");

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

  if (initializing)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader size="lg" variant="slate" />
      </div>
    );

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("signed out");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="dark:bg-slate-700 transition-all dark:text-slate-200">
      <Switcher />
      {user ? (
        <>
          <Button
            onClick={signOut}
            className="bg-slate-600 text-white font-bold 
            text-sm px-4 py-2 flex gap-1 items-center 
            justify-center"
          >
            <FaPowerOff />
            <span>Sign Out</span>
          </Button>
          <Channel user={user} db={db} msgRef={msgRef} />
        </>
      ) : (
        <>
          <div className="flex items-center justify-center shadow-md h-full">
            <div className="flex flex-col items-center justify-center max-w-xl w-full mx-4 p-3 md:p-8 rounded-md shadow-card min-h-screen bg-white dark:bg-coolDark-600 transition-all">
              <h2 className="mb-2 text-3xl flex flex-col gap-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="flex-shrink-0 w-24 h-24 mr-1 text-primary-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                    clipRule="evenodd"
                  />
                </svg>
                Flows FireChat
              </h2>
              <p className="mb-8 text-lg text-center">
                The easiest way to chat with people all around the world.
              </p>
              <button
                onClick={signInWithGoogle}
                className="rounded shadow-md pl-6 pr-8 py-3 bg-gray-100 hover:bg-slate-200 text-gray-600 font-medium flex items-center justify-center overflow-y-hidden focus:outline-none focus:ring focus:ring-primary-500 focus:ring-opacity-75"
              >
                <svg
                  viewBox="5 -5 30 30"
                  enableBackground="new 5 -5 30 30"
                  className="w-6 h-6 mr-4 flex-shrink-0"
                >
                  <path
                    fill="#fff"
                    d="M15.3-4.2C11.6-3 8.4-.2 6.6 3.2 6 4.5 5.6 5.7 5.3 7c-.7 3.3-.2 6.7 1.3 9.7 1 1.9 2.4 3.7 4.2 5 1.6 1.3 3.5 2.2 5.6 2.7 2.6.7 5.3.7 7.8.1 2.3-.5 4.5-1.6 6.3-3.2 1.9-1.7 3.2-3.9 3.9-6.2.8-2.6.9-5.3.4-8-4.8 0-9.6 0-14.4 0 0 2 0 3.9 0 5.9 2.8 0 5.6 0 8.3 0-.3 1.9-1.5 3.6-3.1 4.6-1 .7-2.2 1.1-3.4 1.3-1.2.2-2.5.2-3.7 0-1.2-.2-2.4-.7-3.4-1.4-1.6-1.1-2.9-2.8-3.5-4.6-.7-1.9-.7-4 0-5.8.5-1.3 1.2-2.5 2.2-3.5 1.2-1.2 2.8-2.1 4.6-2.5 1.5-.3 3-.2 4.5.2 1.2.4 2.4 1 3.3 1.9.9-.9 1.9-1.8 2.8-2.8.5-.5 1-1 1.5-1.5-1.4-1.3-3.1-2.3-4.9-3-3.3-1.2-7-1.2-10.3-.1z"
                  ></path>
                  <path
                    fill="#EA4335"
                    d="M15.3-4.2c3.3-1.1 7-1.1 10.3.1 1.8.7 3.5 1.7 4.9 3-.5.5-1 1-1.5 1.5-.9.9-1.9 1.8-2.8 2.8-.9-.9-2.1-1.5-3.3-1.9-1.4-.4-3-.5-4.5-.2-1.7.4-3.3 1.2-4.6 2.5-1 1-1.8 2.2-2.2 3.5-1.7-1.3-3.3-2.5-5-3.8 1.8-3.5 5-6.2 8.7-7.5z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M5.3 7c.3-1.3.7-2.6 1.3-3.7 1.7 1.3 3.3 2.5 5 3.8-.7 1.9-.7 4 0 5.8-1.7 1.3-3.3 2.5-5 3.8-1.5-2.9-2-6.4-1.3-9.7z"
                  ></path>
                  <path
                    fill="#4285F4"
                    d="M20.3 7.2c4.8 0 9.6 0 14.4 0 .5 2.6.4 5.4-.4 8-.7 2.4-2 4.6-3.9 6.2-1.6-1.2-3.2-2.5-4.9-3.7 1.6-1.1 2.7-2.8 3.1-4.6-2.8 0-5.6 0-8.3 0 0-2 0-4 0-5.9z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M6.6 16.7c1.7-1.3 3.3-2.5 5-3.8.6 1.8 1.9 3.5 3.5 4.6 1 .7 2.2 1.2 3.4 1.4 1.2.2 2.4.2 3.7 0 1.2-.2 2.4-.6 3.4-1.3 1.6 1.2 3.2 2.5 4.9 3.7-1.8 1.6-3.9 2.7-6.3 3.2-2.6.6-5.3.6-7.8-.1-2-.5-3.9-1.5-5.6-2.7-1.7-1.3-3.2-3-4.2-5z"
                  ></path>
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
