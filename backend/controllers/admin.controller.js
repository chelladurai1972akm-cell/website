const adminService = require("../services/admin.service");


// =====================
// Dashboard
// =====================
exports.dashboard = async (req, res) => {

try {

const data = await adminService.getDashboard();

res.json({
success: true,
data
});

} catch (error) {

res.status(500).json({
message: error.message
});

}

};


// =====================
// Get Users
// =====================
exports.getUsers = async (req, res) => {

try {

const users = await adminService.getUsers();

res.json({
success: true,
data: users
});

} catch (error) {

res.status(500).json({
message: error.message
});

}

};


// =====================
// Get Campaigns
// =====================
exports.getCampaigns = async (req, res) => {

try {

const campaigns = await adminService.getCampaigns();

res.json({
success: true,
data: campaigns
});

} catch (error) {

res.status(500).json({
message: error.message
});

}

};


// =====================
// Approve Campaign
// =====================
exports.approveCampaign = async (req,res)=>{

try{

const campaign = await adminService.approveCampaign(req.params.id);

// 3. Auto post
await socialService.postFacebook(campaign);
await socialService.postInstagram(campaign);
await socialService.postTwitter(campaign);

res.json({
message:"Campaign approved & posted"
});

}catch(error){

console.log(error);

res.status(500).json({
message:"Error approving"
});

}

};


// =====================
// Reject Campaign
// =====================
exports.rejectCampaign = async (req, res) => {

try {

const id = req.params.id;

await adminService.rejectCampaign(id);

res.json({
success: true
});

} catch (error) {

res.status(500).json({
message: error.message
});

}

};