// let token = "";

// async function register(){
//   await fetch("https://cloud-notes-app-gtuo.onrender.com/auth/register",{
//     method:"POST",
//     headers:{"Content-Type":"application/json"},
//     body: JSON.stringify({
//       email: email.value,
//       password: password.value
//     })
//   });
//   alert("Registered");
// }

// async function login(){
//   const res = await fetch("https://cloud-notes-app-gtuo.onrender.com/auth/login",{
//     method:"POST",
//     headers:{"Content-Type":"application/json"},
//     body: JSON.stringify({
//       email: email.value,
//       password: password.value
//     })
//   });

//   const data = await res.json();
//   token = data.token;
//   getNotes();
// }

// async function addNote(){
//   const form = new FormData();
//   form.append("title", title.value);
//   form.append("content", content.value);
//   form.append("image", image.files[0]);

//   await fetch("https://cloud-notes-app-gtuo.onrender.com/notes",{
//     method:"POST",
//     headers:{
//       "Authorization": token
//     },
//     body: form
//   });

//   getNotes();
// }

// async function getNotes(){
//   notes.innerHTML = "<div class='loading'>Loading...</div>";

//   const res = await fetch("https://cloud-notes-app-gtuo.onrender.com/notes",{
//     headers: { "Authorization": token }
//   });

//   const data = await res.json();

//   notes.innerHTML = data.map(n =>
//     `<div class="note">
//       <h3>${n.title}</h3>
//       <p>${n.content}</p>
//       <img src="${n.image}" />
//     </div>`
//   ).join("");
// }
//   // notes.innerHTML = data.map(n =>
//   //   `<div>
//   //     <h3>${n.title}</h3>
//   //     <p>${n.content}</p>
//   //     <img src="${n.image}" width="150"/>
//   //   </div>`
//   // ).join("");


let token = "";

// DOM elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const imageInput = document.getElementById("image");
const notesContainer = document.getElementById("notes");

// ✅ Register
async function register() {
  try {
    const res = await fetch("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value,
      }),
    });

    if (!res.ok) throw new Error("Registration failed");

    alert("✅ Registered successfully");
  } catch (err) {
    alert("❌ " + err.message);
  }
}

// ✅ Login
async function login() {
  try {
    const res = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value,
      }),
    });

    if (!res.ok) throw new Error("Login failed");

    const data = await res.json();
    token = data.token;

    alert("✅ Logged in successfully");
    getNotes();
  } catch (err) {
    alert("❌ " + err.message);
  }
}

// ✅ Add Note
async function addNote() {
  if (!token) return alert("❌ Please login first");

  try {
    const form = new FormData();
    form.append("title", titleInput.value);
    form.append("content", contentInput.value);
    if (imageInput.files[0]) form.append("image", imageInput.files[0]);

    const res = await fetch("/notes", {
      method: "POST",
      headers: { Authorization: token }, // DO NOT set Content-Type manually
      body: form,
    });

    if (!res.ok) throw new Error("Failed to add note");

    await getNotes();
    titleInput.value = "";
    contentInput.value = "";
    imageInput.value = "";
  } catch (err) {
    alert("❌ " + err.message);
  }
}

// ✅ Get Notes
async function getNotes() {
  if (!token) return;

  notesContainer.innerHTML = "<div class='loading'>Loading...</div>";

  try {
    const res = await fetch("/notes", {
      headers: { Authorization: token },
    });

    if (!res.ok) throw new Error("Failed to fetch notes");

    const data = await res.json();

    notesContainer.innerHTML = data
      .map(
        (n) => `
      <div class="note">
        <h3>${n.title}</h3>
        <p>${n.content}</p>
        ${n.image ? `<img src="${n.image}" />` : ""}
      </div>
    `
      )
      .join("");
  } catch (err) {
    notesContainer.innerHTML = "<p>Failed to load notes</p>";
  }
}