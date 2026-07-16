import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  setPersistence,
  browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
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

window.login = async function () {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {

  await setPersistence(
  auth,
  browserSessionPersistence
);

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

  const loginBox = document.getElementById("loginBox");
  const dashboard = document.getElementById("dashboard");

  if (user) {

    loginBox.style.display = "none";
    dashboard.style.display = "block";

    loadData();

  } else {

    loginBox.style.display = "block";
    dashboard.style.display = "none";

  }

});

window.saveData = async function () {

  try {

    const oldSnap = await getDoc(
      doc(db, "website", "main")
    );

    const oldData =
      oldSnap.exists() ? oldSnap.data() : {};

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
        youtube: document.getElementById("youtube").value,
        heroImage: oldData.heroImage || ""
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

    const snap = await getDoc(
      doc(db, "website", "main")
    );

    if (snap.exists()) {

      const data = snap.data();

      if (data.heroImage) {

        document.getElementById("heroPreview").src =
          data.heroImage;

        document.getElementById("heroPreview").style.display =
          "block";

      }

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

      loadPhotos();
      loadVideos();
      loadAnalytics();
      
    }

  } catch (err) {

    console.log(err);

  }

}

window.uploadHero = async function () {

  const file =
    document.getElementById("heroFile").files[0];

  if (!file) {

    document.getElementById("heroStatus").innerText =
      "Please select image";

    return;
  }

  try {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "magician_upload");
    formData.append("folder", "magician-bhuvan");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/y9ynjjvq/image/upload",
      {
        method: "POST",
        body: formData
      }
    );

    const result = await response.json();

    await setDoc(
      doc(db, "website", "main"),
      {
        heroImage: result.secure_url
      },
      { merge: true }
    );

    document.getElementById("heroPreview").src =
      result.secure_url;

    document.getElementById("heroPreview").style.display =
      "block";

    document.getElementById("heroStatus").innerText =
      "Hero Image Uploaded";

  } catch (err) {

    document.getElementById("heroStatus").innerText =
      err.message;

  }

};

// PHOTO GALLERY

window.uploadPhoto = async function () {

  const files = document.getElementById("photoFile").files;

  if (files.length === 0) {
    document.getElementById("photoStatus").innerText =
      "Please select photo";
    return;
  }

  try {

    for (const file of files) {

      console.log("Uploading:", file.name);

      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "magician_upload");
      formData.append("folder", "magician-bhuvan/photos");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/y9ynjjvq/image/upload",
        {
          method: "POST",
          body: formData
        }
      );

        console.log("Saved:", file.name);

      const result = await response.json();

      await addDoc(
        collection(db, "gallery"),
        {
          imageUrl: result.secure_url,
          createdAt: Date.now()
        }
      );
    }

    document.getElementById("photoStatus").innerText =
      "Photos Uploaded Successfully";

    document.getElementById("photoFile").value = "";

    loadPhotos();

  } catch (err) {

    document.getElementById("photoStatus").innerText =
      err.message;
  }
};

async function loadPhotos() {

  const gallery =
    document.getElementById("photoGallery");

  gallery.innerHTML = "";

  const snap =
    await getDocs(collection(db, "gallery"));

  snap.forEach((docSnap) => {

    const data = docSnap.data();

    gallery.innerHTML += `
      <div class="item">
        <img src="${data.imageUrl}">
        <button class="red"
          onclick="deletePhoto('${docSnap.id}')">
          Delete Photo
        </button>
      </div>
    `;
  });
}

window.deletePhoto = async function(id) {

  if (!confirm("Delete this photo?")) return;

  await deleteDoc(
    doc(db, "gallery", id)
  );

  loadPhotos();
};

// VIDEO GALLERY

window.uploadVideo = async function () {

  const files = document.getElementById("videoFile").files;

  if (files.length === 0) {

    document.getElementById("videoStatus").innerText =
      "Please select video";

    return;
  }

  try {

    document.getElementById("videoStatus").innerText =
      "Uploading Videos...";

    let uploadedCount = 0;

    for (let i = 0; i < files.length; i++) {

      const file = files[i];

      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "magician_upload");
      formData.append("folder", "magician-bhuvan/videos");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/y9ynjjvq/video/upload",
        {
          method: "POST",
          body: formData
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error?.message || "Video upload failed"
        );
      }

      await addDoc(
        collection(db, "videos"),
        {
          videoUrl: result.secure_url,
          createdAt: Date.now()
        }
      );

      uploadedCount++;

      document.getElementById("videoStatus").innerText =
        `Uploaded ${uploadedCount} of ${files.length} videos`;
    }

    document.getElementById("videoStatus").innerText =
      `${uploadedCount} Videos Uploaded Successfully`;

    document.getElementById("videoFile").value = "";

    loadVideos();

  } catch (err) {

    console.error(err);

    document.getElementById("videoStatus").innerText =
      err.message;

  }

};

async function loadVideos() {

  const gallery =
    document.getElementById("videoGallery");

  gallery.innerHTML = "";

  const snap =
    await getDocs(collection(db, "videos"));

  snap.forEach((docSnap) => {

    const data = docSnap.data();

    gallery.innerHTML += `
      <div class="item">

        <video controls preload="metadata">
          <source src="${data.videoUrl}">
        </video>

        <button
          class="red"
          onclick="deleteVideo('${docSnap.id}')">
          Delete Video
        </button>

      </div>
    `;

  });

}

window.deleteVideo = async function(id) {

  if (!confirm("Delete this video?")) {
    return;
  }

  await deleteDoc(
    doc(db, "videos", id)
  );

  loadVideos();

};

async function loadAnalytics() {

  try {

    const snap = await getDoc(
      doc(db, "analytics", "main")
    );

    if (!snap.exists()) return;

    const data = snap.data();

    document.getElementById("totalVisits").innerText =
      data.totalVisits || 0;

    document.getElementById("uniqueVisitors").innerText =
      data.uniqueVisitors || 0;

  } catch (err) {

    console.log(err);

  }

}

window.changePassword = async function () {

  const currentPassword =
    document.getElementById("currentPassword").value;

  const newPassword =
    document.getElementById("newPassword").value;

  const confirmPassword =
    document.getElementById("confirmPassword").value;

  if (newPassword !== confirmPassword) {

    document.getElementById("passwordStatus").innerText =
      "Passwords do not match";

    return;

  }

  if (newPassword.length < 6) {

    document.getElementById("passwordStatus").innerText =
      "Password must be at least 6 characters";

    return;

  }

  try {

    const user = auth.currentUser;

    const credential =
      EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

    await reauthenticateWithCredential(
      user,
      credential
    );

    await updatePassword(
      user,
      newPassword
    );

    document.getElementById("passwordStatus").innerText =
      "Password Changed Successfully";

    document.getElementById("currentPassword").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmPassword").value = "";

  } catch (err) {

    document.getElementById("passwordStatus").innerText =
      err.message;

  }

};
