const db = require("../../config/role.config");
const Project = db.project;
const User = db.user;

const getInitiatorBoard = async (req, res, next) => {
	try {
		const user = await User.findById(req.userId).populate("roles");
		const numOfInitiatedProject = await Project.find({
			initiator: req.userId,
		}).countDocuments();

		const totalDenied = await Project.find({ initiator: req.userId })
			.where("reviewed")
			.equals(false)
			.where("approved")
			.equals(false)
			.countDocuments();

		const totalApproved = await Project.find({ initiator: req.userId })
			.where("approved")
			.equals(true)
			.where("reviewed")
			.equals(true)
			.countDocuments();

		const { password, secretToken, ...userData } = user._doc;

		res.status(200).json({
			success: true,
			msg: "Data fetched successfully",
			user: {
				...userData,
			},
			numOfInitiatedProject,
			totalDenied,
			totalApproved,
		});
	} catch (err) {
		next(err)
	}
};

const getInitiatorDesk = async (req, res, next) => {
	try {
		const project = await Project.findById({ _id: req.params.id });
		if (!project) {
			return res
				.status(404)
				.json({ success: false, msg: "The project does not exist" });
		}

		return res.status(200).json({
			success: true,
			msg: "Project fetched successfully",
			project,
		});
	} catch (err) {
		next(err)
	}
};

module.exports = {getInitiatorBoard, getInitiatorDesk};
