const marketerService = require("../services/marketerService");

exports.createCampaign = async (req, res) => {

try {

const campaignData = {

campaign_name: req.body.campaign_name,
description: req.body.description,
price: req.body.price,
target_audience: req.body.target_audience,
expiry_date: req.body.expiry_date,
image: req.file ? req.file.filename : null,
marketer_id: req.user.id  

};

await marketerService.createCampaign(campaignData);

res.json({
message:"Campaign Created"
});

}catch(error){

console.error(error);

res.status(500).json({
message:"Server Error"
});

}

};

exports.getDashboard = async (req, res) => {

    try {

        const marketerId = req.params.id;

        const dashboard = await marketerService
            .getDashboard(marketerId);
        res.status(200).json(dashboard);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error fetching dashboard"
        });

    }

};


exports.getMyCampaigns = async (req, res) => {

try{

const marketerId = req.params.id;

const campaigns = await marketerService.getMyCampaigns(marketerId);

res.json(campaigns);

}catch(error){

console.error(error);

res.status(500).json({
message:"Server Error"
});

}

};