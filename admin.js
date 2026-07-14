import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCgCrXp0kh11u3ES4ZQFkjWcAcvBPnSo00",
  authDomain: "magicianbhuvanbhaskar-b6c70.firebaseapp.com",
  projectId: "magicianbhuvanbhaskar-b6c70",
  storageBucket: "magicianbhuvanbhaskar-b6c70.firebasestorage.app",
  messagingSenderId: "11124052200",
  appId: "1:11124052200:web:c5795c333510c6cfc2f95d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.login = async function () {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    document.getElementById("loginStatus").innerText =
      "Login Successful";

  } catch (error) {

    document.getElementById("loginStatus").innerText =
      error.message;

  }

};

window.logout = async function () {

  await signOut(auth);

};

onAuthStateChanged(auth, (user) => {

  const loginBox =
    document.getElementById("loginBox");

  const dashboard =
    document.getElementById("dashboard");

  if (user) {

    loginBox.style.display = "none";
    dashboard.style.display = "block";

  } else {

    loginBox.style.display = "block";
    dashboard.style.display = "none";

  }

});
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const db = getFirestore(app);

window.saveData = async function () {

  try {

    await setDoc(
      doc(db, "website", "main"),
      {
        name: document.getElementById("name").value,
        bio: document.getElementById("bio").value,
        shows: document.getElementById("shows").value,
        cities: document.getElementById("cities").value,
        years: document.getElementById("years").value,
        phone: document.getElementById("phone").value,
        instagram: document.getElementById("instagram").value,
        youtube: document.getElementById("youtube").value
      }
    );

    document.getElementById("saveStatus").innerText =
      "Saved Successfully";

  } catch (err) {

    document.getElementById("saveStatus").innerText =
      err.message;

  }

};

async function loadData() {

  try {

    const snap =
      await getDoc(doc(db, "website", "main"));

    if (snap.exists()) {

      const data = snap.data();

      document.getElementById("name").value =
        data.name || "";

      document.getElementById("bio").value =
        data.bio || "";

      document.getElementById("shows").value =
        data.shows || "";

      document.getElementById("cities").value =
        data.cities || "";

      document.getElementById("years").value =
        data.years || "";

      document.getElementById("phone").value =
        data.phone || "";

      document.getElementById("instagram").value =
        data.instagram || "";

      document.getElementById("youtube").value =
        data.youtube || "";

    }

  } catch (err) {

    console.log(err);

  }

}
