const API = "http://localhost:5001/api";

async function loadCampaigns(){

const res = await fetch(API+"/user/campaigns");

const campaigns = await res.json();

const container = document.getElementById("campaigns");

container.innerHTML = "";

campaigns.forEach(c=>{

container.innerHTML += `

<div class="col-lg-4 col-md-6 mb-4">

<div class="card h-100 shadow-sm border-0">

<img 
src="http://localhost:5001/uploads/${c.image}" 
class="card-img-top"
style="height:200px;object-fit:cover;"
>

<div class="card-body d-flex flex-column">

<h5 class="card-title fw-semibold">
${c.campaign_name}
</h5>

<p class="card-text text-muted">
${c.description}
</p>

<div class="mt-auto">

<h5 class="text-primary fw-bold">
₹ ${c.price}
</h5>

<button 
class="btn btn-primary w-100 mt-2"
onclick="buyCampaign('${c.id}',${c.price})"
>
Buy Campaign
</button>

</div>

</div>

</div>

</div>

`;

});

}

loadCampaigns();


async function buyCampaign(id,amount){

try{

const res = await fetch(API+"/payment/create-order",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
amount:amount
})

});

const order = await res.json();

const options = {

key:"rzp_test_YOURKEY", // Replace with your Razorpay key

amount:order.amount,

currency:"INR",

order_id:order.id,

name:"Campaign Marketplace",

description:"Purchase Campaign",

theme:{
color:"#0d6efd"
},

handler:function(response){

alert("Payment Successful 🎉");

console.log(response);

}

};

const rzp = new Razorpay(options);

rzp.open();

}catch(error){

console.log("Payment Error",error);

}

}