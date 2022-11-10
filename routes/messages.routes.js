const express = require("express");
const router = express.Router();

const {
	addMessage,
	getMessage,
	getNotify,
} = require("../controllers/messages/messages.controller");

const { authJwt } = require("../middlewares");

router.post('/', [authJwt.verifyToken], addMessage);

router.get("/:conversationId", [authJwt.verifyToken], getMessage);

router.get("/notify/:id", [authJwt.verifyToken], getNotify);

module.exports = router;