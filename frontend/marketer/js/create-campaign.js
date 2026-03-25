document
.getElementById("campaignForm")
.addEventListener("submit", async function (e) {

e.preventDefault();

const formData = new FormData();

formData.append(
"campaign_name",
document.getElementById("campaign_name").value
);

formData.append(
"description",
document.getElementById("description").value
);

formData.append(
"price",
document.getElementById("price").value
);

formData.append(
"target_audience",
document.getElementById("target_audience").value
);

const expiryInput = document.getElementById("expiry_date").value;

const expiry_date = expiryInput.replace("T", " ") + ":00";

formData.append("expiry_date", expiry_date);

formData.append(
"image",
document.getElementById("image").files[0]
);


// ADD THIS
const token = localStorage.getItem("token");


try {

const response = await fetch(
"http://localhost:5001/api/marketer/create-campaign",
{
method: "POST",
headers: {
Authorization: token
},
body: formData
}
);

const data = await response.json();

alert("Campaign Created Successfully");

window.location.href = "dashboard.html";

} catch (error) {

console.log(error);
alert("Error creating campaign");

}

});