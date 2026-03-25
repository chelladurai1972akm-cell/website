const adminRepository = require("../repositories/admin.repository");
const socialService = require("./social.service");
const db = require("../config/db");

// =====================
// Dashboard
// =====================

exports.getDashboard = async () => {

const totalUsers = await adminRepository.totalUsers();
const totalMarketers = await adminRepository.totalMarketers();
const totalAdmins = await adminRepository.totalAdmins();

return {
totalUsers,
totalMarketers,
totalAdmins
};

};


// =====================
// Get Users
// =====================

exports.getUsers = async () => {

return await adminRepository.getUsers();

};



// =====================
// Get Campaigns
// =====================

exports.getCampaigns = async () => {

return await adminRepository.getCampaigns();

};



// =====================
// Approve Campaign
// =====================

exports.approveCampaign = async (id) => {

await db.query(
"UPDATE campaigns SET status='approved' WHERE id=?",
[id]
);

//  Fetch campaign after approve
const [rows] = await db.query(
"SELECT * FROM campaigns WHERE id=?",
[id]
);

const campaign = rows[0];

return campaign;

};



// =====================
// Reject Campaign
// =====================

exports.rejectCampaign = async (id) => {

return await adminRepository.rejectCampaign(id);

};