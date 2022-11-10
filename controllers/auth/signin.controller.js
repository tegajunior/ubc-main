const dbRole = require("../../config/role.config");
const User = dbRole.user;
const Role = dbRole.role;
const { compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

const loginUser = async (req, res, next) => {
	try {
		if (!req.body.userInput || !req.body.password)
			return res
				.status(400)
				.json({ success: false, msg: "All fields are required" });

		let userName = req.body.userInput.toLowerCase().replace(/ /g, "");

		const user = await User.findOne({
			$or: [{ staffnum: userName }, { email: userName }], 
		}).populate("roles", "-__v");

		if (!user) {
			return res.status(404).json({ success: false, msg: "User Not found." });
		}

		let passwordMatch = await compare(req.body.password, user.password);

		if (!passwordMatch) {
			return res.status(403).json({
				success: false,
				accessToken: null,
				msg: "Invalid login credential",
			});
		}

		let token = jwt.sign({ id: user.id }, secret, { 
			expiresIn: 1800, // 30 minutes
		});

		let authorities = []; 

		for (let i = 0; i < user.roles.length; i++) { 
			authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
		}

		const { password, secretToken, ...userData } = user._doc; 

		res.status(200).json({ 
			success: true,
			msg: "Login successful",
			accessToken: token, 
			...userData,
			roles: authorities,
		});
	} catch (err) {
		next(err)
	}
};

module.exports = loginUser;
