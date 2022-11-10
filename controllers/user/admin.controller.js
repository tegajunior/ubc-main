const db = require("../../config/role.config");
const User = db.user;
const Role = db.role;

const bcryptjs = require("bcryptjs");

const updateUser = async (req, res, next) => {
	let {
		firstname,
		lastname,
		middlename,
		email,
		phone,
		staffnum,
		department,
		jobTitle,
		dateOfBirth,
		gender,
		grade,
		stateOfOrigin,
		localGovt,
		employmentLocation,
		employmentDate,
		pencomNumber,
		nhf,
		active,
		roles,
	} = req.body;

	try {
		if (req.body.password) {
			req.body.password = bcryptjs.hashSync(req.body.password, 12);
		}

		const newRole = await Role.findById(req.body.roles);
		const updatedUser = await User.findById({ _id: req.params.id });

		if (!updatedUser) {
			return res.status(404).json({ success: false, msg: "User not found" });
		}

		updatedUser.firstname = firstname;
		updatedUser.lastname = lastname;
		updatedUser.middlename = middlename;
		updatedUser.email = email;
		updatedUser.phone = phone;
		updatedUser.staffnum = staffnum;
		updatedUser.department = department;
		updatedUser.jobTitle = jobTitle;
		updatedUser.dateOfBirth = dateOfBirth;
		updatedUser.gender = gender;
		updatedUser.grade = updatedUser;
		updatedUser.stateOfOrigin = stateOfOrigin;
		updatedUser.localGovt = localGovt;
		updatedUser.employmentLocation = employmentLocation;
		updatedUser.employmentDate = employmentDate;
		updatedUser.pencomNumber = updatedUser;
		updatedUser.nhf = nhf;
		updatedUser.active = active;
		updatedUser.roles = newRole;

		res.status(201).json({
			success: true,
			msg: "User updated successfully",
			user: {
				...updatedUser._doc,
				password: "",
			},
		});
	} catch (err) {
		next(err)
	}
};

const deleteUser = async (req, res, next) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(201).json({
			success: true,
			msg: "User deleted successfully",
		});
	} catch (err) {
		next(err)
	}
};

const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id).populate("roles");
		
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

const getAllRoles = async (req, res, next) => {
	try {
		const allRoles = await Role.find({});
		if (!allRoles) {
			return res.status(404).json({ success: false, msg: "No roles found" });
		}

		return res.status(200).json({
			success: true,
			msg: "All roles",
			allRoles: allRoles,
		});
	} catch (err) {
		next(err)
	}
};

const getAdminBoard = async (req, res, next) => {
	try {
		const user = await User.findById(req.userId).populate("roles");

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

module.exports = {
	updateUser,
	deleteUser,
	getUser,
	getAllRoles,
	getAdminBoard,
};
