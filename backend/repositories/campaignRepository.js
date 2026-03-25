const db = require("../db");

exports.getApprovedCampaigns = async () => {

const [rows] = await db.query(
"SELECT * FROM campaigns WHERE status = 'approved'"
);

return rows;

};