const express = require("express");
const router = express.Router();

const { getAllProject } = require("../controllers/project/project.controller");

const {
	getAllUser,
	getUserBoard,
	getLoginUserData,
	getAuser,
	getContacts
} = require("../controllers/user/user.controller");

const { authJwt } = require("../middlewares");

// Get All /users/all
router.get("/all", [authJwt.verifyToken], getAllUser);

// Get User Profile /users/
router.get("/profile", [authJwt.verifyToken], getUserBoard);

// Get login user data /users/user
router.get("/user/:id", [authJwt.verifyToken], getLoginUserData);

// Public board /users/project
router.get("/project", [authJwt.verifyToken], getAllProject);

// Get user for message routes
router.get("/", [authJwt.verifyToken], getAuser);

// Get contacts
router.get("/contacts", [authJwt.verifyToken], getContacts);

module.exports = router;
