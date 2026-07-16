// ======================
// FIREBASE IMPORTS
// ======================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ======================
// FIREBASE CONFIG
// ======================

const firebaseConfig = {
  apiKey: "AIzaSyCgCrXp0kh11u3ES4ZQFkjWcAcvBPnSo00",
  authDomain: "magicianbhuvanbhaskar-b6c70.firebaseapp.com",
  projectId: "magicianbhuvanbhaskar-b6c70",
  storageBucket: "magicianbhuvanbhaskar-b6c70.firebasestorage.app",
  messagingSenderId: "11124052200",
  appId: "1:11124052200:web:c5795c333510c6cfc2f95d"
};


// ======================
// FIREBASE INIT
// ======================

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// ======================
// LOADER
// ======================

window.addEventListener("load", () => {

  setTimeout(() => {

    const loader =
      document.getElementById("loader");

    if (loader) {

      loader.style.opacity = "0";

      setTimeout(() => {

        loader.style.display = "none";

      }, 500);

    }

  }, 2500);

});


// ======================
// WEBSITE DATA
// ======================

async function loadWebsiteData() {

  try {

    const websiteRef =
      doc(db, "website", "main");

    const snap =
      await getDoc(websiteRef);

    if (!snap.exists()) return;

    const data = snap.data();

    // HERO IMAGE
    if (
      data.heroImage &&
      document.getElementById("heroImage")
    ) {

      document.getElementById(
        "heroImage"
      ).src = data.heroImage;

    }

    // NAME
    if (
      data.name &&
      document.getElementById("name")
    ) {

      document.getElementById(
        "name"
      ).textContent = data.name;

    }

    // BIO
    if (
      data.bio &&
      document.getElementById("bio")
    ) {

      document.getElementById(
        "bio"
      ).textContent = data.bio;

    }

    // SHOWS
    if (
      data.shows &&
      document.getElementById("shows")
    ) {

      document.getElementById(
        "shows"
      ).textContent =
        data.shows + "+";

    }

    // CITIES
    if (
      data.cities &&
      document.getElementById("cities")
    ) {

      document.getElementById(
        "cities"
      ).textContent =
        data.cities + "+";

    }

    // YEARS
    if (
      data.years &&
      document.getElementById("years")
    ) {

      document.getElementById(
        "years"
      ).textContent =
        data.years + "+";

    }

    // PHONE
    if (
      data.phone &&
      document.getElementById("callBtn")
    ) {

      document.getElementById(
        "callBtn"
      ).href =
        "tel:" + data.phone;

    }

    // WHATSAPP
    if (
      data.phone &&
      document.getElementById("whatsappBtn")
    ) {

      document.getElementById(
        "whatsappBtn"
      ).href =
        "https://wa.me/" +
        data.phone.replace(/\D/g, "");

    }

    // INSTAGRAM
    if (
      data.instagram &&
      document.getElementById("instagramBtn")
    ) {

      document.getElementById(
        "instagramBtn"
      ).href =
        data.instagram;

    }

    // YOUTUBE
    if (
      data.youtube &&
      document.getElementById("youtubeBtn")
    ) {

      document.getElementById(
        "youtubeBtn"
      ).href =
        data.youtube;

    }

  } catch (error) {

    console.error(
      "Website Data Error:",
      error
    );

  }

}

loadWebsiteData();

// ======================
// PHOTO GALLERY
// ======================

async function loadGallery() {

  try {

    const gallery =
      document.getElementById(
        "photoGallery"
      );

    if (!gallery) return;

    gallery.innerHTML = "";

    const snap =
      await getDocs(
        collection(db, "gallery")
      );

    snap.forEach((docSnap) => {

      const data =
        docSnap.data();

      gallery.innerHTML += `
<img
src="${data.imageUrl}"
alt="Magician Bhuvan Bhaskar"
class="gallery-image">
`;

    });

  } catch (error) {

    console.error(
      "Gallery Error:",
      error
    );

  }

}


// ======================
// VIDEO GALLERY
// ======================

async function loadVideos() {

  try {

    const videoGallery =
      document.getElementById(
        "videoGallery"
      );

    if (!videoGallery) return;

    videoGallery.innerHTML = "";

    const snap =
      await getDocs(
        collection(db, "videos")
      );

    snap.forEach((docSnap) => {

      const data =
        docSnap.data();

      videoGallery.innerHTML += `

      <video
      controls
      preload="metadata"
      class="gallery-video">

      <source
      src="${data.videoUrl}">

      </video>

      `;

    });

  } catch (error) {

    console.error(
      "Video Error:",
      error
    );

  }

}

loadGallery();
loadVideos();


// ======================
// ANALYTICS
// ======================

async function trackAnalytics() {

  try {

    const analyticsRef =
      doc(
        db,
        "analytics",
        "main"
      );

    const snap =
      await getDoc(
        analyticsRef
      );

    let totalVisits = 0;
    let uniqueVisitors = 0;

    if (snap.exists()) {

      const data =
        snap.data();

      totalVisits =
        data.totalVisits || 0;

      uniqueVisitors =
        data.uniqueVisitors || 0;

    }

    totalVisits++;

    if (
      !localStorage.getItem(
        "visited"
      )
    ) {

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

  } catch (error) {

    console.error(
      "Analytics Error:",
      error
    );

  }

}

trackAnalytics();

// ======================
// WHATSAPP BOOKING FORM
// ======================

const bookingForm =
document.getElementById(
  "bookingForm"
);

if (bookingForm) {

bookingForm.addEventListener(
  "submit",
  function (e) {

    e.preventDefault();

    const name =
      bookingForm.querySelectorAll(
        "input"
      )[0].value;

    const phone =
      bookingForm.querySelectorAll(
        "input"
      )[1].value;

    const location =
      bookingForm.querySelectorAll(
        "input"
      )[2].value;

    const eventDate =
      bookingForm.querySelectorAll(
        "input"
      )[3].value;

    const eventType =
      bookingForm.querySelectorAll(
        "select"
      )[0].value;

    const audience =
      bookingForm.querySelectorAll(
        "select"
      )[1].value;

    const message =
      bookingForm.querySelector(
        "textarea"
      ).value;

const whatsappText =

`🎩 MAGIC SHOW BOOKING ENQUIRY

Name: ${name}

Phone: ${phone}

Location: ${location}

Event Date: ${eventDate}

Event Type: ${eventType}

Expected Audience: ${audience}

Message:
${message}`;

window.open(
`https://wa.me/919229609882?text=${encodeURIComponent(
whatsappText
)}`,
"_blank"
);

});
}

// ======================
// SCROLL DOWN BUTTON
// ======================

const scrollDown =
document.getElementById(
  "scrollDown"
);

if (scrollDown) {

scrollDown.addEventListener(
  "click",
  () => {

    document
      .querySelector(".stats")
      .scrollIntoView({
        behavior: "smooth"
      });

  }
);

}


// ======================
// SCROLL ANIMATION
// ======================

const sections =
document.querySelectorAll(
  ".section"
);

const observer =
new IntersectionObserver(

(entries) => {

entries.forEach((entry) => {

if (
entry.isIntersecting
) {

entry.target.classList.add(
"show"
);

}

});

},

{
threshold: 0.1
}

);

sections.forEach(
(section) => {

observer.observe(
section
);

}
);


// ======================
// HIDDEN ADMIN ACCESS
// ======================

let tapCount = 0;

const secretAdmin =
document.getElementById(
  "secretAdmin"
);

if (secretAdmin) {

secretAdmin.addEventListener(
  "click",
  () => {

    tapCount++;

    if (tapCount >= 7) {

      tapCount = 0;

      window.location.href =
      "admin.html";

    }

    setTimeout(() => {

      tapCount = 0;

    }, 3000);

  }
);

}


// ======================
// CONSOLE MESSAGE
// ======================

console.log(
"🎩 Magician Bhuvan Bhaskar Website Loaded Successfully"
);

document.addEventListener(
  "play",
  function (e) {

    if (e.target.tagName !== "VIDEO") return;

    document
      .querySelectorAll("video")
      .forEach((video) => {

        if (video !== e.target) {
          video.pause();
        }

      });

  },
  true
);
