const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const dbRole = require("../config/role.config");
const User = dbRole.user;
const Role = dbRole.role;

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
	if (err instanceof TokenExpiredError) {
		return res.status(401).json({
			success: false,
			msg: "Unauthorized! You need to login, session expired.",
		});
	}

	return res.sendStatus(401).json({ success: false, msg: "Unauthorized! Please login to continue" });
}

verifyToken = (req, res, next) => {
	let token = req.headers["x-access-token"];

	if (!token) {
		return res.status(403).json({
			success: false,
			msg: "You need to login to perform this action",
		});
	}

	jwt.verify(token, secret, (err, decoded) => {
		if (err) {
			return res.status(401).json({ success: false, msg: "Your session expired, please login to continue" });
		}
		req.userId = decoded.id;
		next();
	});
};

isAdmin = (req, res, next) => {
	User.findById(req.userId).exec((err, user) => {
		if (err) {
			res.status(500).json({ success: false, msg: err.message });
			return;
		}

		Role.find(
			{
				_id: { $in: user.roles },
			},
			(err, roles) => {
				if (err) {
					res.status(500).json({ success: false, msg: err.message });
					return;
				}

				for (let i = 0; i < roles.length; i++) {
					if (roles[i].name === "admin") {
						next();
						return;
					}
				}

				res.status(403).json({ success: false, msg: "Require Admin Role!" });
				return;
			},
		);
	});
};

isApprover = (req, res, next) => {
	User.findById(req.userId).exec((err, user) => {
		if (err) {
			res.status(500).json({ success: false, msg: err.message });
			return;
		}

		Role.find(
			{
				_id: { $in: user.roles },
			},
			(err, roles) => {
				if (err) {
					res.status(500).json({ success: false, msg: err.message });
					return;
				}

				for (let i = 0; i < roles.length; i++) {
					if (roles[i].name === "approver") {
						next();
						return;
					}
				}

				res.status(403).json({ success: false, msg: "Require Approver Role!" });
				return;
			},
		);
	});
};

isReviewer = (req, res, next) => {
	User.findById(req.userId).exec((err, user) => {
		if (err) {
			res.status(500).json({ success: false, msg: err.message });
			return;
		}

		Role.find(
			{
				_id: { $in: user.roles },
			},
			(err, roles) => {
				if (err) {
					res.status(500).json({ success: false, msg: err.message });
					return;
				}

				for (let i = 0; i < roles.length; i++) {
					if (roles[i].name === "reviewer") {
						next();
						return;
					}
				}

				res.status(403).json({ success: false, msg: "Require Reviewer Role!" });
				return;
			},
		);
	});
};

isInitiator = (req, res, next) => {
	User.findById(req.userId).exec((err, user) => {
		if (err) {
			res.status(500).json({ success: false, msg: err.message });
			return;
		}

		Role.find(
			{
				_id: { $in: user.roles },
			},
			(err, roles) => {
				if (err) {
					res.status(500).json({ msg: err.message });
					return;
				}

				for (let i = 0; i < roles.length; i++) {
					if (roles[i].name === "initiator") {
						next();
						return;
					}
				}

				res.status(403).json({ success: false, msg: "Require Initiator Role!" });
				return;
			},
		);
	});
};

const authJwt = {
	verifyToken,
	isApprover,
	isAdmin,
	isReviewer,
	isInitiator,
};

module.exports = authJwt;