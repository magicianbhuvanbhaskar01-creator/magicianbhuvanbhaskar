// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs
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

async function loadGallery() {

  const photoGallery =
    document.getElementById("photoGallery");

  const snap =
    await getDocs(collection(db, "gallery"));

  photoGallery.innerHTML = "";

  snap.forEach((docSnap) => {

    const data = docSnap.data();

    photoGallery.innerHTML += `
      <img
        src="${data.imageUrl}"
        style="
          width:100%;
          max-width:300px;
          border-radius:12px;
          margin:10px;
        ">
    `;

  });

}

async function loadVideos() {

  const videoGallery =
    document.getElementById("videoGallery");

  const snap =
    await getDocs(collection(db, "videos"));

  videoGallery.innerHTML = "";

  snap.forEach((docSnap) => {

    const data = docSnap.data();

    videoGallery.innerHTML += `
      <video
        controls
        style="
          width:100%;
          max-width:400px;
          border-radius:12px;
          margin:10px;
        ">
        <source src="${data.videoUrl}">
      </video>
    `;

  });

}

loadGallery();
loadVideos();

async function trackAnalytics() {

  const analyticsRef =
    doc(db, "analytics", "main");

  const snap =
    await getDoc(analyticsRef);

  if (!snap.exists()) return;

  const data = snap.data();

  let totalVisits =
    data.totalVisits || 0;

  let uniqueVisitors =
    data.uniqueVisitors || 0;

  totalVisits++;

  if (!localStorage.getItem("visited")) {

    uniqueVisitors++;

    localStorage.setItem(
      "visited",
      "true"
    );

  }

  await setDoc(
    analyticsRef,
    {
      totalVisits,
      uniqueVisitors
    }
  );

}

trackAnalytics();

trackAnalytics();

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
