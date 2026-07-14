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
