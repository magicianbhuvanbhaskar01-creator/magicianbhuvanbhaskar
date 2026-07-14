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
updateDoc
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


// Init

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


// Login

window.login = async function () {

const email = document.getElementById("email").value;

const password = document.getElementById("password").value;

const status = document.getElementById("loginStatus");

try {

await signInWithEmailAndPassword(
auth,
email,
password
);

status.innerHTML = "Login Successful ✅";

}
catch(error){

status.innerHTML = error.message;

}

};


// Logout

window.logout = async function(){

await signOut(auth);

location.reload();

};


// Auth State

onAuthStateChanged(auth, async(user)=>{

if(user){

document.getElementById("loginBox").style.display="none";

document.getElementById("dashboard").style.display="block";

loadData();

}

});


// Load Firestore Data

async function loadData(){

const docRef = doc(
db,
"website",
"main"
);

const snap = await getDoc(docRef);

if(!snap.exists()) return;

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


// Save Data

window.saveData = async function(){

const status =
document.getElementById("saveStatus");

try{

await updateDoc(

doc(db,"website","main"),

{

name:
document.getElementById("name").value,

bio:
document.getElementById("bio").value,

shows:
Number(document.getElementById("shows").value),

cities:
Number(document.getElementById("cities").value),

years:
Number(document.getElementById("years").value),

phone:
document.getElementById("phone").value,

instagram:
document.getElementById("instagram").value,

youtube:
document.getElementById("youtube").value

}

);

status.innerHTML =
"Saved Successfully ✅";

}
catch(error){

status.innerHTML =
error.message;

}

};
