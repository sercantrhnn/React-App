import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCuYmBGFnptGaGhm0APLTZFIwa0TRNTVmw",
  authDomain: "ete-technology.firebaseapp.com",
  projectId: "ete-technology",
  storageBucket: "ete-technology.appspot.com",
  messagingSenderId: "792932722150",
  appId: "1:792932722150:web:0a3d0dee97edfb8dcb6227"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);