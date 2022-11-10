const dbRole = require("../../config/role.config");
const User = dbRole.user;
const Role = dbRole.role;
const bcryptjs = require("bcryptjs");
const resetPasswordEmail = require("../../utils/resetPasswordEmail");
const randomstring = require("randomstring");

const resetPassword = async (req, res, next) => {
	try {
		let { userInput } = req.body;

		if (!userInput)
			return res
				.status(400)
				.json({ success: false, msg: "Feel in required field" });

		let userName = req.body.userInput.toLowerCase().replace(/ /g, "");

		const user = await User.findOne({
			$or: [{ staffnum: userName }, { email: userName }],
		});

		if (!user)
			return res
				.status(400)
				.json({ success: false, msg: "No user with that detail found" });

		let generatedPassword = await randomstring.generate({
			length: 10,
			charset: "alphanumeric",
			capitalization: "lowercase",
		});

		let hashedPassword = bcryptjs.hashSync(generatedPassword, 12);

		user.password = hashedPassword;		

		await user.save();

		await resetPasswordEmail(req, user.firstname, user.email, generatedPassword);
		res.status(201).json({
			success: true,
			msg: "Please check your email for the new password.",
		});
	} catch (err) {
		next(err);
	}
};

module.exports = resetPassword;
