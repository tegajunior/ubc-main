const db = require("../../config/role.config");
const User = db.user;
const Role = db.role;
const Project = db.project;

const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
const bcryptjs = require("bcryptjs");
const welcomeEmail = require("../../utils/welcomeEmail");

const signupUser = async (req, res, next) => {
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

	let assignedRole = req.body.roles.toUpperCase();

	let generatedPassword =
		assignedRole === "ADMIN"
			? process.env.DEFAULT_ADMIN_PASSWORD
			: await randomstring.generate({
					length: 10,
					charset: "alphanumeric",
					capitalization: "lowercase",
			  });

	try {
		if (
			!firstname ||
			!lastname ||
			!middlename ||
			!email ||
			!phone ||
			!staffnum ||
			!department ||
			!jobTitle ||
			!dateOfBirth ||
			!gender ||
			!grade ||
			!stateOfOrigin ||
			!localGovt ||
			!employmentLocation ||
			!employmentDate ||
			!pencomNumber ||
			!nhf ||
			!active ||
			!roles
		) {
			return res
				.status(400)
				.json({ success: false, msg: "All fields are required" });
		}

		if (!/\b\w+\@\w+\.\w+(?:\.\w+)?\b/.test(email)) {
			return res
				.status(400)
				.json({ success: false, msg: "Enter a valid email address." });
		}

		const staff_num = await User.findOne({ staffnum });
		if (staff_num) {
			return res
				.status(409)
				.json({ success: false, msg: "Staff ID already exists" });
		}

		const user_email = await User.findOne({ email });
		if (user_email) {
			return res.status(409).json({ success: false, msg: "Email already exists" });
		}

		let hashedPassword = bcryptjs.hashSync(generatedPassword, 12);

		const newUser = new User({
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
			password: hashedPassword,
		});

		await newUser.save((err, user) => {
			if (err) {
				return res
					.status(500)
					.json({ success: false, msg: "Something went wrong", error: err });
			}

			if (req.body.roles) {
				Role.find(
					{
						name: { $in: req.body.roles },
					},
					(err, roles) => {
						if (err) {
							return res
								.status(500)
								.json({ success: false, msg: "Something went wrong", error: err });
						}
						user.roles = roles.map((role) => role._id);
						user.save((err) => {
							if (err) {
								return res
									.status(500)
									.json({ success: false, msg: "Something went wrong", error: err });
							}
							let { password, secretToken, ...userData } = user._doc;
							res.status(201).json({
								success: true,
								msg: "User registration successful",
								...userData,
							});
						});
					},
				);
			}
		});

		await welcomeEmail(req, firstname, email, generatedPassword, assignedRole);
	} catch (err) {
		next(err);
	}
};

module.exports = signupUser;
