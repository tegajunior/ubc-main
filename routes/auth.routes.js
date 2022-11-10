const express = require("express");
const router = express.Router();
const signupUser = require("../controllers/auth/signup.controller");
const signinUser = require("../controllers/auth/signin.controller");
const resetPassword = require("../controllers/auth/reset.controller");
const refreshTokenCheck = require("../controllers/auth/refreshToken.controller");
const { verifyRole, authJwt } = require("../middlewares");

router.post(
	"/signup",
	[verifyRole.checkRolesExisted, authJwt.verifyToken, authJwt.isAdmin],
	signupUser,
);
router.post("/signin", signinUser);
router.post("/refreshtoken", refreshTokenCheck);
router.post("/reset", resetPassword);
 
module.exports = router;
