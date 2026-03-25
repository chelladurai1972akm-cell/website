const db = require("../config/db");

exports.createCampaign = async (data) => {

    const query = `

INSERT INTO campaigns
(
campaign_name,
description,
price,
image,
target_audience,
expiry_date,
marketer_id,
status
)

VALUES (?,?,?,?,?,?,?,?)

`;

    const values = [

        data.campaign_name,
        data.description,
        data.price,
        data.image,
        data.target_audience,
        data.expiry_date,
        data.marketer_id,
        "pending"

    ];

    const [result] = await db.query(query, values);

    return result;

};

exports.getMarketerDashboard = async (marketerId) => {

    const summaryQuery = `

SELECT 
COUNT(*) as totalCampaigns,

SUM(status='approved') as approved,
SUM(status='pending') as pending,
SUM(status='rejected') as rejected,
SUM(status='expired') as expired,

SUM(views) as views,
SUM(clicks) as clicks,
SUM(leads) as leads,
SUM(conversions) as conversions,
SUM(likes) as likes


FROM campaigns
WHERE marketer_id = ?

`;

    const campaignsQuery = `

SELECT 
id,
campaign_name,
views,
clicks,
leads,
conversions,
likes

FROM campaigns
WHERE marketer_id = ?

ORDER BY created_at DESC

`;

    const [summary] = await db.query(summaryQuery, [marketerId]);
    const [campaigns] = await db.query(campaignsQuery, [marketerId]);

    return {
        summary: summary[0],
        campaigns
    };

};


exports.getMyCampaigns = async (marketerId) => {

const [rows] = await db.query(

`SELECT 
id,
campaign_name,
description,
price,
target_audience,
expiry_date,
status,
image
FROM campaigns
WHERE marketer_id = ?
ORDER BY id DESC`,

[marketerId]

);

return rows;

};