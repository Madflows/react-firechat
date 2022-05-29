import firebase, { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAjBTpDeYqqLfSyeJLO2wdEPOJKiLnRkpg",
  authDomain: "react-firechat-ab49a.firebaseapp.com",
  projectId: "react-firechat-ab49a",
  storageBucket: "react-firechat-ab49a.appspot.com",
  messagingSenderId: "337888528995",
  appId: "1:337888528995:web:ea94b7669c786030564656",
  measurementId: "G-TBMYQCMYJ7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <div>
      
    </div>
  )
}

export default App
