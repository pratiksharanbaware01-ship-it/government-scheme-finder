// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAIQthlZJVbfua_82533TQK5q8eVmcLtT0",
  authDomain: "government-scheme-finder-7071d.firebaseapp.com",
  projectId: "government-scheme-finder-7071d",
  storageBucket: "government-scheme-finder-7071d.firebasestorage.app",
  messagingSenderId: "1064959853377",
  appId: "1:1064959853377:web:8b2321782572200ed257c0",
  measurementId: "G-7TT8JY1F22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ================= REGISTER =================

const registerBtn = document.getElementById("registerBtn");

if (registerBtn) {
  registerBtn.addEventListener("click", () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Registration Successful");
        window.location.href = "login.html";
      })
      .catch((error) => {
        alert(error.message);
      });

  });
}

// ================= LOGIN =================

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Login Successful");
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        alert(error.message);
      });

  });
}

// ================= SEARCH =================

const searchBtn = document.getElementById("searchBtn");

if (searchBtn) {

  searchBtn.addEventListener("click", async () => {

    try {

      const search = document.getElementById("searchInput").value.toLowerCase();
      const result = document.getElementById("result");

      result.innerHTML = "";

      const querySnapshot = await getDocs(collection(db, "schemes"));

      querySnapshot.forEach((doc) => {

        const data = doc.data();
console.log(data.name);
        if (
    data.name.toLowerCase().includes(search) ||
    data.category.toLowerCase().includes(search) ||
    data.benefits.toLowerCase().includes(search) ||
    data.eligibility.toLowerCase().includes(search)
) {

          result.innerHTML += `
            <div class="card">
              <h3>${data.name}</h3>
              <p><b>Category:</b> ${data.category}</p>
              <p><b>Benefits:</b> ${data.benefits}</p>
              <p><b>Eligibility:</b> ${data.eligibility}</p>
            </div>
          `;

        }

      });

      if (result.innerHTML === "") {
        result.innerHTML = "<h3>No Scheme Found</h3>";
      }

    } catch (error) {
      console.log(error);
      alert(error.message);
    }

  });

}

// ================= ADMIN PANEL =================

const addSchemeBtn = document.getElementById("addSchemeBtn");

if (addSchemeBtn) {

  addSchemeBtn.addEventListener("click", async () => {

    const name = document.getElementById("schemeName").value;
    const category = document.getElementById("category").value;
    const benefits = document.getElementById("benefits").value;
    const eligibility = document.getElementById("eligibility").value;
    const state = document.getElementById("state").value;

    try {

      if (window.editId) {

    await updateDoc(doc(db, "schemes", window.editId), {
        name,
        category,
        benefits,
        eligibility,
         state
    });

    alert("Scheme Updated Successfully!");

    window.editId = null;

    document.getElementById("addSchemeBtn").innerText = "Add Scheme";

} else {

    await addDoc(collection(db, "schemes"), {
        name,
        category,
        benefits,
        eligibility,
        state
    });

    alert("Scheme Added Successfully!");

}
      alert("Scheme Added Successfully!");

      document.getElementById("schemeName").value = "";
      document.getElementById("category").value = "";
      document.getElementById("benefits").value = "";
      document.getElementById("eligibility").value = "";

    } catch (error) {

      alert(error.message);

    }

  });

}
// ================= VIEW ALL SCHEMES =================

const viewSchemeBtn = document.getElementById("viewSchemeBtn");

if (viewSchemeBtn) {

  viewSchemeBtn.addEventListener("click", async () => {

    const schemeList = document.getElementById("schemeList");
    schemeList.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "schemes"));

    querySnapshot.forEach((doc) => {

      const data = doc.data();

      schemeList.innerHTML += `
  <div class="card">
    <h3>${data.name}</h3>
    <p><b>Category:</b> ${data.category}</p>
    <p><b>Benefits:</b> ${data.benefits}</p>
    <p><b>Eligibility:</b> ${data.eligibility}</p>
<p><b>State:</b> ${data.state}</p>

    <button onclick="editScheme(
'${doc.id}',
'${data.name}',
'${data.category}',
'${data.benefits}',
'${data.eligibility}'
)">

✏️ Edit
</button>

<br><br>

    <button onclick="deleteScheme('${doc.id}')">
      🗑 Delete
    </button>
  </div>
`;

    });

  });

}
// ================= DELETE SCHEME =================

window.deleteScheme = async function (id) {

  if (confirm("Are you sure you want to delete this scheme?")) {

    try {

      await deleteDoc(doc(db, "schemes", id));

      alert("Scheme Deleted Successfully!");

      document.getElementById("viewSchemeBtn").click();

    } catch (error) {

      alert(error.message);

    }

  }

}
// ================= EDIT SCHEME =================

window.editScheme = function(id, name, category, benefits, eligibility) {

    document.getElementById("schemeName").value = name;
    document.getElementById("category").value = category;
    document.getElementById("benefits").value = benefits;
    document.getElementById("eligibility").value = eligibility;

    document.getElementById("addSchemeBtn").innerText = "Update Scheme";

    window.editId = id;

}
// ================= LOGOUT =================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

  logoutBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    await signOut(auth);

    alert("Logged Out Successfully!");

    window.location.href = "login.html";

  });

}