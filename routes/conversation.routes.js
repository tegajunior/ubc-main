const express = require("express");
const router = express.Router();

const {
    createConversation,
    userConversation,
    multipleConversation
} = require("../controllers/conversation/conversation.controller");

const { authJwt } = require("../middlewares");

router.post("/", [authJwt.verifyToken], createConversation);

router.get("/", [authJwt.verifyToken], userConversation);

router.get(
	"/find/:firstUserId/:secondUserId",
	[authJwt.verifyToken],
	multipleConversation,
);

module.exports = router;
