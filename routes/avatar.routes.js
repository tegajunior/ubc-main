const express = require("express");
const router = express.Router();

const {
   createUserAvatar,
   getUserAvatar,
} = require("../controllers/avatar/avatar.controller");

const uploadMiddleware = require("../config/avatarMulter.config");

const { authJwt } = require("../middlewares");

router.post("/", [authJwt.verifyToken], uploadMiddleware, createUserAvatar);
router.get("/image/:id", getUserAvatar);

module.exports = router;
