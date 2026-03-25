const campaignService = require("../services/campaignService");

exports.getApprovedCampaigns = async (req, res) => {

try{

const campaigns = await campaignService.getApprovedCampaigns();

res.json(campaigns);

}catch(error){
console.log("ERROR:", error); 
res.status(500).json({
message:"Server error"
})

}

};