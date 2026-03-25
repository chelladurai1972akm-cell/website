const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const marketerMiddleware = require("../middleware/marketerMiddleware");

const marketerController = require("../controllers/marketercontroller");
const upload = require("../middleware/multer");


// Create Campaign
router.post(
"/create-campaign",
auth,
marketerMiddleware,
upload.single("image"),
marketerController.createCampaign
);


// Dashboard
router.get(
"/dashboard/:id",
auth,
marketerMiddleware,
marketerController.getDashboard
);


// My Campaigns
router.get(
"/campaigns/:id",
auth,
marketerMiddleware,
marketerController.getMyCampaigns
);

module.exports = router;