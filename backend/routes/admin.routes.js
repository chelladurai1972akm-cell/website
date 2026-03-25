const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// =====================
// Admin Dashboard
// =====================
router.get(
"/dashboard",
authMiddleware,
adminMiddleware,
adminController.dashboard
);


// =====================
// Get Users
// =====================
router.get(
"/users",
authMiddleware,
adminMiddleware,
adminController.getUsers
);


// =====================
// Get Campaigns
// =====================
router.get(
"/campaigns",
authMiddleware,
adminMiddleware,
adminController.getCampaigns
);


// =====================
// Approve Campaign
// =====================
router.put(
"/campaigns/approve/:id",
authMiddleware,
adminMiddleware,
adminController.approveCampaign
);


// =====================
// Reject Campaign
// =====================
router.put(
"/campaigns/reject/:id",
authMiddleware,
adminMiddleware,
adminController.rejectCampaign
);


module.exports = router;