const axios = require("axios");


const TEST_MODE = true; // turn OFF when real posting
// ===============================
// Facebook Post
// ===============================

exports.postFacebook = async (campaign) => {

try {

if(TEST_MODE){

console.log("📘 [TEST] Facebook Post");
console.log(campaign);
return;

}

const PAGE_ID = process.env.FB_PAGE_ID;
const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

await axios.post(
`https://graph.facebook.com/${PAGE_ID}/feed`,
{
message: `
🚀 New Campaign Live!

${campaign.campaign_name}

Price: ₹${campaign.price}

Don't miss it!
`
},
{
params: {
access_token: ACCESS_TOKEN
}
}
);

console.log("📘 Posted to Facebook");

} catch (error) {

console.log("Facebook Error:", error.response?.data);

}

};



// ===============================
// Instagram Post
// ===============================

exports.postInstagram = async (campaign) => {

try {

if(TEST_MODE){

console.log("📸 [TEST] Instagram Post");
console.log(campaign);
return;

}

const IG_ID = process.env.IG_BUSINESS_ID;
const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

const media = await axios.post(
`https://graph.facebook.com/v18.0/${IG_ID}/media`,
{
image_url: campaign.image_url || "https://via.placeholder.com/500",
caption: `
🚀 ${campaign.campaign_name}

Price: ₹${campaign.price}

#Marketing #Campaign
`,
access_token: ACCESS_TOKEN
}
);

await axios.post(
`https://graph.facebook.com/v18.0/${IG_ID}/media_publish`,
{
creation_id: media.data.id,
access_token: ACCESS_TOKEN
}
);

console.log("📸 Posted to Instagram");

} catch (error) {

console.log("Instagram Error:", error.response?.data);

}

};




// ===============================
// Twitter Post
// ===============================
exports.postTwitter = async (campaign) => {

console.log("🐦 [TEST] Twitter Post");
console.log(campaign);

};