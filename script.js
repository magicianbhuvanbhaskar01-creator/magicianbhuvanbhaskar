// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc
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

// Firebase Init

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Loader

window.addEventListener("load", () => {

  setTimeout(() => {

    document.getElementById("loader").style.display = "none";

  }, 2500);

});

// Load Website Data

async function loadWebsiteData() {

  try {

    const docRef = doc(db, "website", "main");

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

      const data = docSnap.data();

      document.getElementById("name").innerText =
        data.name || "Magician Bhuvan Bhaskar";

      document.getElementById("bio").innerText =
        data.bio || "";

      document.getElementById("shows").innerText =
        (data.shows || 0) + "+";

      document.getElementById("cities").innerText =
        (data.cities || 0) + "+";

      document.getElementById("years").innerText =
        (data.years || 0) + "+";

      document.getElementById("instagramBtn").href =
        data.instagram || "#";

      document.getElementById("youtubeBtn").href =
        data.youtube || "#";

      document.getElementById("callBtn").href =
        "tel:" + (data.phone || "");

    }

  } catch (error) {

    console.log(error);

  }

}

loadWebsiteData();

// WhatsApp Form

document
.getElementById("bookingForm")
.addEventListener("submit", function(e){

e.preventDefault();

const name =
this.querySelector("input").value;

const phone =
this.querySelectorAll("input")[1].value;

const message =
this.querySelector("textarea").value;

const text =
`Hello Magician Bhuvan Bhaskar

Name: ${name}

Phone: ${phone}

Message: ${message}`;

window.open(
`https://wa.me/919229609882?text=${encodeURIComponent(text)}`
);

});
