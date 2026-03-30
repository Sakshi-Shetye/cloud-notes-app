let token = "";

async function register(){
  await fetch("https://cloud-notes-app-gtuo.onrender.com/auth/register",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });
  alert("Registered");
}

async function login(){
  const res = await fetch("https://cloud-notes-app-gtuo.onrender.com/auth/login",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });

  const data = await res.json();
  token = data.token;
  getNotes();
}

async function addNote(){
  const form = new FormData();
  form.append("title", title.value);
  form.append("content", content.value);
  form.append("image", image.files[0]);

  await fetch("https://cloud-notes-app-gtuo.onrender.com/notes",{
    method:"POST",
    headers:{
      "Authorization": token
    },
    body: form
  });

  getNotes();
}

async function getNotes(){
  notes.innerHTML = "<div class='loading'>Loading...</div>";

  const res = await fetch("https://cloud-notes-app-gtuo.onrender.com/notes",{
    headers: { "Authorization": token }
  });

  const data = await res.json();

  notes.innerHTML = data.map(n =>
    `<div class="note">
      <h3>${n.title}</h3>
      <p>${n.content}</p>
      <img src="${n.image}" />
    </div>`
  ).join("");
}
  // notes.innerHTML = data.map(n =>
  //   `<div>
  //     <h3>${n.title}</h3>
  //     <p>${n.content}</p>
  //     <img src="${n.image}" width="150"/>
  //   </div>`
  // ).join("");

