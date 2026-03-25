const API = "http://localhost:5001/api/admin";


async function loadCampaigns(){

try{

const token = localStorage.getItem("token");

const res = await fetch(`${API}/campaigns`,{
headers:{
Authorization:`Bearer ${token}`
}
});

const data = await res.json();

let html = "";
(data.data || []).forEach(campaign => {

let statusText = "Pending";
let statusClass = "bg-warning";

if (campaign.status === "approved") {
statusText = "Approved";
statusClass = "bg-success";
}
else if (campaign.status === "rejected") {
statusText = "Rejected";
statusClass = "bg-danger";
}

html += `

<tr>

<td>${campaign.id}</td>

<td>${campaign.campaign_name}</td>

<td>${campaign.first_name || ''}</td>

<td>₹ ${campaign.price}</td>

<td>
<span class="badge ${statusClass}">
${statusText}
</span>
</td>

<td>

<div class="form-check">
<input class="form-check-input fb-${campaign.id}" type="checkbox">
<label>Facebook</label>
</div>

<div class="form-check">
<input class="form-check-input ig-${campaign.id}" type="checkbox">
<label>Instagram</label>
</div>

<div class="form-check">
<input class="form-check-input tw-${campaign.id}" type="checkbox">
<label>Twitter</label>
</div>

</td>

<td>

<button 
class="btn btn-success btn-sm"
onclick="approve(${campaign.id})"
${campaign.status === "approved" ? "disabled" : ""}
>
Approve
</button>

<button 
class="btn btn-danger btn-sm"
onclick="reject(${campaign.id})"
${campaign.status === "rejected" ? "disabled" : ""}
>
Reject
</button>

</td>

</tr>

`;

});
document.getElementById("campaignTable").innerHTML = html;

}catch(err){

console.log("Campaign Load Error",err);

}

}



async function approve(id){

try{

const token = localStorage.getItem("token");

const facebook = document.querySelector(`.fb-${id}`)?.checked;
const instagram = document.querySelector(`.ig-${id}`)?.checked;
const twitter = document.querySelector(`.tw-${id}`)?.checked;


await fetch(`${API}/campaigns/approve/${id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},

body: JSON.stringify({
facebook,
instagram,
twitter
})

});

loadCampaigns();

}catch(err){
console.log("Approve Error",err)
}

}



async function reject(id){

try{

const token = localStorage.getItem("token");

await fetch(`${API}/campaigns/reject/${id}`,{

method:"PUT",

headers:{
Authorization:`Bearer ${token}`
}

});

loadCampaigns();

}catch(err){
console.log("Reject Error",err)
}

}


loadCampaigns();