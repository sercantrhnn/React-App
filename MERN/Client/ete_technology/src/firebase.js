import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: //",
  authDomain: //,
  projectId: //,
  storageBucket: //,
  messagingSenderId: //,
  appId: //
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
