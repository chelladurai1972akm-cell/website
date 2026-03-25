const db = require("../config/db");


// =====================
// Dashboard Counts
// =====================

exports.totalUsers = async () => {

const [rows] = await db.execute(
"SELECT COUNT(*) as total FROM users"
);

return rows[0].total;

};


exports.totalMarketers = async () => {

const [rows] = await db.execute(
"SELECT COUNT(*) as total FROM users WHERE role='Marketer'"
);

return rows[0].total;

};


exports.totalAdmins = async () => {

const [rows] = await db.execute(
"SELECT COUNT(*) as total FROM users WHERE role='Admin'"
);

return rows[0].total;

};



// =====================
// Get Users
// =====================

exports.getUsers = async () => {

const [rows] = await db.execute(
`SELECT 
id,
first_name,
last_name,
email,
phone,
role,
status
FROM users 
ORDER BY created_at DESC`
);

return rows;

};



// =====================
// Get Campaigns
// =====================

exports.getCampaigns = async () => {

const [rows] = await db.execute(`
SELECT 
c.id,
c.campaign_name,
c.price,
c.status,
c.created_at,
u.first_name,
u.last_name
FROM campaigns c
LEFT JOIN users u 
ON c.marketer_id = u.id
ORDER BY c.created_at DESC
`);

return rows;

};



// =====================
// Get Campaign By ID
// =====================

exports.getCampaignById = async (id) => {

const [rows] = await db.execute(
"SELECT * FROM campaigns WHERE id=?",
[id]
);

return rows[0];

};



// =====================
// Approve Campaign
// =====================

exports.approveCampaign = async (id) => {

await db.execute(
"UPDATE campaigns SET status = 1 WHERE id = ?",
[id]
);

};



// =====================
// Reject Campaign
// =====================

exports.rejectCampaign = async (id) => {

await db.execute(
"UPDATE campaigns SET status = 'rejected' WHERE id = ?",
[id]
);

};