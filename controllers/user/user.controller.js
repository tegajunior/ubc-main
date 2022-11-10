const db = require("../../config/role.config");
const User = db.user;
const Project = db.project;

const getAllUser = async (req, res, next) => {
	try {
		const allUsers = await User.find({})
			.sort({ createdAt: -1 })
			.populate("roles");
		if (!allUsers) {
			return res.status(404).json({ success: false, msg: "No users found" });
		}

		return res.status(200).json({
			success: true,
			msg: "All users",
			allUsers: allUsers,
		});
	} catch (err) {
		next(err)
	}
};

const getUserBoard = async (req, res, next) => {
	try {
		const user = await User.findById(req.userId).populate("roles");

		const { password, secretToken, ...userData } = user._doc;

		res.status(200).json({
			success: true,
			msg: "User fetched successfully",
			user: {
				...userData,
			},
		});
	} catch (err) {
		next(err)
	}
};

const getLoginUserData = async (req, res, next) => {
	try {
		if (!req.params.id) return;
		
		const user = await User.findById(req.params.id);

		const { password, secretToken, ...userData } = user._doc;

		res.status(200).json({
			success: true,
			msg: "Data fetched successfully",
			user: {
				...userData,
			},
		});
	} catch (err) {
		next(err)
	}
};

const getAuser = async (req, res, next) => {
	const userId = req.query.userId;
	try {
		const user = await User.findById(userId).populate("roles");
		const { password, secretToken, updatedAt, ...userData } = user._doc;

		res.status(200).json({
			success: true,
			msg: "Data fetched successfully",
			user: {
				...userData,
			}
		});
	} catch (err) {
		next(err)
	}
};

const getContacts = async (req, res, next) => {
	try {
		const users = await User.find({}).sort({ createdAt: -1 });
		if (!users) {
			return res.status(404).json({ success: false, msg: "No users found" });
		}

		let contactArray = [];

		const contacts = users.map((user) => {
			contactArray.push(user._id);
		});

		return res.status(200).json({
			success: true,
			msg: "All users",
			data: contactArray,
		});
	} catch (err) {
		next(err)
	}
};

module.exports = {
	getAllUser,
	getUserBoard,
	getLoginUserData,
	getAuser,
	getContacts,
};
