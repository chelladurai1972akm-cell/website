const API = "http://localhost:5001/api/admin";

async function loadDashboard() {

    try {

        const token = localStorage.getItem("token");

        const res = await fetch(`${API}/dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();

        document.getElementById("totalUsers").innerText =
            data.data.totalUsers;

        document.getElementById("totalMarketers").innerText =
            data.data.totalMarketers;

        document.getElementById("totalAdmins").innerText =
            data.data.totalAdmins;

        document.getElementById("totalRevenue").innerText =
            data.data.totalRevenue;

    } catch (error) {
        console.error("Dashboard Error:", error);
    }

}



async function loadUsers() {

    try {

        const token = localStorage.getItem("token");

        const res = await fetch(`${API}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();

        let html = "";

        data.data.forEach(user => {

            html += `
<tr>
<td>${user.first_name} ${user.last_name}</td>
<td>${user.email}</td>
<td>${user.role}</td>
<td>${user.status ? "Active" : "Inactive"}</td>
</tr>
`;

        });

        document.getElementById("usersTable").innerHTML = html;

    } catch (error) {
        console.error("Users Error:", error);
    }

}


loadDashboard();
loadUsers();