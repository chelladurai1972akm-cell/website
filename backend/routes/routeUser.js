const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/campaigns", userController.getApprovedCampaigns);

module.exports = router;