const express = require("express");
const router = express.Router();

const {
	getAndDisplayProjectImage,
	deleteFile,
	getAndDisplayProjectFile,
} = require("../controllers/project/project.controller");

const { authJwt } = require("../middlewares");

router.get("/file/:id", getAndDisplayProjectFile);
router.get("/image/:id", getAndDisplayProjectImage);
router.delete("/file/:id", [authJwt.verifyToken], deleteFile);

module.exports = router;
   