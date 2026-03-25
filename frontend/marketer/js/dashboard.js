const user = JSON.parse(localStorage.getItem("user"));

if(!user){
window.location.href = "../auth/login.html";
}

const marketerId = user.id;


async function loadDashboard(){

const res = await fetch(
`http://localhost:5001/api/marketer/dashboard/${marketerId}`
);

const data = await res.json();

console.log("Dashboard Data:", data);

document.getElementById("totalCampaigns").innerText = data.totalCampaigns;
document.getElementById("views").innerText = data.views;
document.getElementById("clicks").innerText = data.clicks;
document.getElementById("leads").innerText = data.leads;
document.getElementById("conversions").innerText = data.conversions;
document.getElementById("likes").innerText = data.likes;

document.getElementById("approved").innerText = data.approved;
document.getElementById("pending").innerText = data.pending;
document.getElementById("rejected").innerText = data.rejected;
document.getElementById("expired").innerText = data.expired;

loadTable(data.campaigns);

}


function loadTable(campaigns){

const table = document.getElementById("campaignTable");

table.innerHTML = "";

campaigns.forEach(campaign => {

table.innerHTML += `

<tr>
<td>${campaign.campaign_name}</td>
<td>${campaign.views}</td>
<td>${campaign.clicks}</td>
<td>${campaign.leads}</td>
<td>${campaign.conversions}</td>
<td>${campaign.likes}</td>
</tr>

`;

});

}

loadDashboard();