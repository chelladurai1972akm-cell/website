const API = "http://localhost:5001/api/auth";

document.getElementById("registerForm")
.addEventListener("submit", async function(e){

e.preventDefault();

const firstName = document.getElementById("firstName").value;
const lastName = document.getElementById("lastName").value;
const email = document.getElementById("email").value;
const phone = document.getElementById("phone").value;
const password = document.getElementById("password").value;
const confirmPassword = document.getElementById("confirmPassword").value;
const role = document.getElementById("role").value;


if(password !== confirmPassword){
alert("Passwords not match")
return;
}

try{

const res = await fetch(`${API}/register`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
firstName,
lastName,
email,
phone,
password,
role
})

});

const data = await res.json();

if(data.success){

alert("User Registered Successfully")

window.location.href="login.html"

}else{

alert(data.message)

}

}catch(err){

console.log(err)
alert("Registration Failed")

}

});