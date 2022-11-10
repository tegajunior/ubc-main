const express = require("express");
const router = express.Router();

const { getAllUser } = require("../controllers/user/user.controller");
const {
	getAdminBoard,
	getUser,
	updateUser,
	deleteUser,
	getAllRoles,
} = require("../controllers/user/admin.controller");
const { authJwt } = require("../middlewares");


//Get Admin Profile /admin
router.get("/", [authJwt.verifyToken, authJwt.isAdmin], getAdminBoard);


// Get All users
router.get("/users/all", getAllUser);

// Admin board
router.get("/roles/all", [authJwt.verifyToken, authJwt.isAdmin], getAllRoles);

router.get("/user/:id", [authJwt.verifyToken, authJwt.isAdmin], getUser);
router.put("/user/:id", [authJwt.verifyToken, authJwt.isAdmin], updateUser);
router.delete("/user/:id", [authJwt.verifyToken, authJwt.isAdmin], deleteUser);

module.exports = router;
