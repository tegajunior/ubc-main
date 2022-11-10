const express = require("express");
const router = express.Router();

const {
	 getApprovalBoard,
	reviewProjectTenor,
	reviewProjectAmount,
	projectStatus,
	projectApprove,
	getProject,
} = require("../controllers/user/approval.controller");

const { authJwt } = require("../middlewares");

//Get Approver Profile
router.get("/", [authJwt.verifyToken, authJwt.isApprover], getApprovalBoard);

// Get a single project by ID
router.get(
	"/project/:id",
	[authJwt.verifyToken, authJwt.isApprover],
	getProject,
);

// Update a project Tenor
router.post(
	"/project/tenor/:id",
	[authJwt.verifyToken, authJwt.isApprover],
	reviewProjectTenor,
);

// Update a project Amount
router.post(
	"/project/amount/:id",
	[authJwt.verifyToken, authJwt.isApprover],
	reviewProjectAmount,
);

// Update a project Review
router.post(
	"/project/review/:id",
	[authJwt.verifyToken, authJwt.isApprover],
	projectApprove,
);

// Update/Review a project Status
router.post(
	"/project/status/:id",
	[authJwt.verifyToken, authJwt.isApprover],
	projectStatus,
);

module.exports = router; 
