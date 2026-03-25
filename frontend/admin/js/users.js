const API = "http://localhost:5001/api/admin";

async function loadUsers() {

try {

const token = localStorage.getItem("token");

if (!token) {
window.location.href = "../login.html";
return;
}

const res = await fetch(`${API}/users`, {
headers: {
Authorization: `Bearer ${token}`
}
});

if (res.status === 401) {
localStorage.removeItem("token");
window.location.href = "../login.html";
return;
}

const data = await res.json();

console.log("Users API Response:", data);

const users = data.data || [];

let html = "";

users.forEach(user => {

html += `

<tr>
<td>${user.id}</td>

<td>
${user.first_name || ''} ${user.last_name || ''}
</td>

<td>${user.email || '-'}</td>

<td>${user.phone ?? '-'}</td>

<td>
<span class="badge bg-primary">
${user.role}
</span>
</td>

<td>
<span class="badge ${user.status ? 'bg-success' : 'bg-danger'}">
${user.status ? 'Active' : 'Inactive'}
</span>
</td>

<td>${user.email || '-'}</td>

</tr>

`;

});

document.getElementById("usersTable").innerHTML = html;

} catch (err) {
console.error("Users Load Error:", err);
}

}

loadUsers();