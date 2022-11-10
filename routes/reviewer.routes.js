const express = require("express");
const router = express.Router();

const {
	getReviewerBoard,
	reviewProjectTenor,
	getProject,
	reviewProjectAmount,
	projectReview,
	projectStatus,
} = require("../controllers/user/reviewer.controller");

const { authJwt } = require("../middlewares");

// Get Reviewer Profile
router.get("/", [authJwt.verifyToken, authJwt.isReviewer], getReviewerBoard);

// Get a single project by ID
router.get(
	"/project/:id",
	[authJwt.verifyToken, authJwt.isReviewer],
	getProject,
);

// Update/Review a project Tenor
router.post(
	"/project/tenor/:id",
	[authJwt.verifyToken, authJwt.isReviewer],
	reviewProjectTenor,
);

// Update/Review a project Amount
router.post(
	"/project/amount/:id",
	[authJwt.verifyToken, authJwt.isReviewer],
	reviewProjectAmount,
);

// Update/Review a project Review
router.post(
	"/project/review/:id",
	[authJwt.verifyToken, authJwt.isReviewer],
	projectReview,
);

// Update/Review a project Status
router.post(
	"/project/status/:id",
	[authJwt.verifyToken, authJwt.isReviewer],
	projectStatus,
);

module.exports = router;
