const API = "http://localhost:5001/api/auth";

document.getElementById("loginForm")
.addEventListener("submit", async function(e){

e.preventDefault();

const role = document.getElementById("role").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try{

const res = await fetch(`${API}/login`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
email,
password,
role
})

});

const data = await res.json();

if(data.success){

localStorage.setItem("token", data.data.token);
localStorage.setItem("user", JSON.stringify(data.data.user));


if(role === "Admin"){
window.location.href="../admin/dashboard.html"
}

if(role === "Marketer"){
window.location.href="../marketer/dashboard.html"
}

if(role === "User"){
window.location.href="../user/dashboard.html"
}

}else{

alert(data.message)

}

}catch(err){

alert("Login failed")

}

});