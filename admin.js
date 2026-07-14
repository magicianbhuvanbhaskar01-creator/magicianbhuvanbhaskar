// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCgCrXp0kh11u3ES4ZQFkjWcAcvBPnSo00",
  authDomain: "magicianbhuvanbhaskar-b6c70.firebaseapp.com",
  projectId: "magicianbhuvanbhaskar-b6c70",
  storageBucket: "magicianbhuvanbhaskar-b6c70.firebasestorage.app",
  messagingSenderId: "11124052200",
  appId: "1:11124052200:web:c5795c333510c6cfc2f95d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// Login
window.login = async function () {

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Login Successful");

  } catch (error) {

    alert(error.message);

  }
};


// Logout
window.logout = async function () {

  await signOut(auth);

};


// Auth State Check
onAuthStateChanged(auth, (user) => {

  const loginSection =
    document.getElementById("loginSection");

  const adminPanel =
    document.getElementById("adminPanel");

  if (user) {

    loginSection.style.display = "none";
    adminPanel.style.display = "block";

    loadData();

  } else {

    loginSection.style.display = "block";
    adminPanel.style.display = "none";

  }

});


// Load Website Data
async function loadData() {

  try {

    const ref = doc(db, "website", "main");

    const snap = await getDoc(ref);

    if (snap.exists()) {

      const data = snap.data();

      if(document.getElementById("siteTitle"))
        document.getElementById("siteTitle").value =
          data.siteTitle || "";

      if(document.getElementById("siteDescription"))
        document.getElementById("siteDescription").value =
          data.siteDescription || "";

    }

  } catch (err) {

    console.error(err);

  }

}


// Save Website Data
window.saveData = async function () {

  try {

    await setDoc(
      doc(db, "website", "main"),
      {
        siteTitle:
          document.getElementById("siteTitle").value,

        siteDescription:
          document.getElementById("siteDescription").value
      }
    );

    alert("Saved Successfully");

  } catch (err) {

    alert(err.message);

  }

};
