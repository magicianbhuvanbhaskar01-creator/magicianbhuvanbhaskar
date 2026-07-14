import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
const db = getFirestore(app);

const CLOUD_NAME = "y9ynjjvq";
const UPLOAD_PRESET = "magician_upload";

window.login = async function () {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    document.getElementById("loginStatus").innerHTML =
      "Login Successful ✅";

  } catch (error) {

    document.getElementById("loginStatus").innerHTML =
      error.message;

  }

};

window.logout = async function () {

  await signOut(auth);
  location.reload();

};

onAuthStateChanged(auth, async (user) => {

  if (!user) return;

  document.getElementById("loginBox").style.display = "none";
  document.getElementById("dashboard").style.display = "block";

  await loadData();

});

async function loadData() {

  const ref = doc(db, "website", "main");
  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  const data = snap.data();

  document.getElementById("name").value = data.name || "";
  document.getElementById("bio").value = data.bio || "";
  document.getElementById("shows").value = data.shows || "";
  document.getElementById("cities").value = data.cities || "";
  document.getElementById("years").value = data.years || "";
  document.getElementById("phone").value = data.phone || "";
  document.getElementById("instagram").value = data.instagram || "";
  document.getElementById("youtube").value = data.youtube || "";

}

window.saveData = async function () {

  try {

    await updateDoc(
      doc(db, "website", "main"),
      {
        name: document.getElementById("name").value,
        bio: document.getElementById("bio").value,
        shows: Number(document.getElementById("shows").value),
        cities: Number(document.getElementById("cities").value),
        years: Number(document.getElementById("years").value),
        phone: document.getElementById("phone").value,
        instagram: document.getElementById("instagram").value,
        youtube: document.getElementById("youtube").value
      }
    );

    document.getElementById("saveStatus").innerHTML =
      "Saved Successfully ✅";

  } catch (error) {

    document.getElementById("saveStatus").innerHTML =
      error.message;

  }

};

async function uploadToCloudinary(file) {

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "magician-bhuvan");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
    {
      method: "POST",
      body: formData
    }
  );

  return await response.json();

}
window.uploadPhoto = async function () {

  const file =
    document.getElementById("photoFile").files[0];

  if (!file) {
    alert("Photo Select Karo");
    return;
  }

  try {

    document.getElementById("photoStatus").innerHTML =
      "Uploading...";

    const result =
      await uploadToCloudinary(file);

    await addDoc(
      collection(db, "gallery"),
      {
        url: result.secure_url,
        createdAt: Date.now()
      }
    );

    document.getElementById("photoStatus").innerHTML =
      "Photo Uploaded ✅";

    await loadPhotos();

  } catch (error) {

    document.getElementById("photoStatus").innerHTML =
      error.message;

  async function loadPhotos() {

  const gallery =
    document.getElementById("photoGallery");

  if (!gallery) return;

  gallery.innerHTML = "";

  const snap =
    await getDocs(collection(db, "gallery"));

  snap.forEach((item) => {

    const data = item.data();

    gallery.innerHTML += `
      <div class="item">

        <img src="${data.url}">

        <button
          class="red"
          onclick="deletePhoto('${item.id}')">
          Delete
        </button>

      </div>
    `;o8.
window.deletePhoto = async function (id) {

  const ok =
    confirm("Delete Photo?");

  if (!ok) return;

  try {

    await deleteDoc(
      doc(db, "gallery", id)
    );

    await loadPhotos();

  } catch (error) {

    alert(error.message);

  }

};
