let token = "";

async function register(){
  await fetch("http://localhost:5000/auth/register",{
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
  const res = await fetch("http://localhost:5000/auth/login",{
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

  await fetch("http://localhost:5000/notes",{
    method:"POST",
    headers:{
      "Authorization": token
    },
    body: form
  });

  getNotes();
}

async function getNotes(){
  const res = await fetch("http://localhost:5000/notes",{
    headers: { "Authorization": token }
  });

  const data = await res.json();

  notes.innerHTML = data.map(n =>
    `<div>
      <h3>${n.title}</h3>
      <p>${n.content}</p>
      <img src="${n.image}" width="150"/>
    </div>`
  ).join("");
}
