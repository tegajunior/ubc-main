const express = require("express");
const router = express.Router();

const {getInitiatorBoard, getInitiatorDesk} = require("../controllers/user/initiator.controller");

const {
	createNewProject,
} = require("../controllers/project/project.controller");

const { authJwt } = require("../middlewares");
const store = require("../config/multer.config");

// Get initiator Profile
router.get("/", [authJwt.verifyToken, authJwt.isInitiator], getInitiatorBoard);

router.get("/desk", [authJwt.verifyToken, authJwt.isInitiator], getInitiatorDesk);

//  Initiate/create a project
router.post("/",
	[authJwt.verifyToken, authJwt.isInitiator],
	store.fields([
		{ name: "image", maxCount: 1 },
		{ name: "bidFile", maxCount: 1 },
		{ name: "executiveSummary", maxCount: 1 },
		{ name: "offerDocument", maxCount: 1 },
		{ name: "verificationDocument", maxCount: 1 },
	]),
	createNewProject,
);

module.exports = router;
