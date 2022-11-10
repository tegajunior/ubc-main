const db = require("../../config/role.config");
const Project = db.project;
const User = db.user;

const getApprovalBoard = async (req, res, next) => {
	try {
		const user = await User.findById(req.userId).populate("roles");
		const totalNumProject = await Project.find({}).countDocuments();
		const numOfInitiatedProject = await Project.find({
			approver: req.userId,
		}).countDocuments();

		const allProjects = await Project.find({}).sort({ createdAt: -1 });
		const { password, secretToken, ...userData } = user._doc;

		return res.status(200).json({
			success: true,
			msg: "User fetched successfully",
			user: {
				...userData,
			},
			project: allProjects,
			totalNumProject,
			numOfInitiatedProject,
		});
	} catch (err) {
		next(err);
	}
};

// Update Project Tenor
const reviewProjectTenor = async (req, res, next) => {
	let { tenor } = req.body;
	try {
		if (!tenor) {
			return res
				.status(403)
				.json({ success: false, msg: "Can't update with empty field" });
		}
		const reviewedProject = await Project.findById({ _id: req.params.id });
		// console.log("before:",reviewedProject);

		if (!reviewedProject) {
			return res
				.status(404)
				.json({ success: false, msg: "The project does not exist" });
		}

		if (
			reviewedProject.reviewer === null ||
			reviewedProject.reviewer === "" ||
			reviewedProject.reviewer === undefined
		) {
			return res
				.status(404)
				.json({ success: false, msg: "This Project has not been reviewed" });
		} else {
			reviewedProject.tenor = tenor;
			reviewedProject.approver = req.userId;

			await reviewedProject.save();

			// console.log("after:", reviewedProject);

			return res.status(200).json({
				success: true,
				msg: "Project tenor updated!",
			});
		}
	} catch (err) {
		next(err);
	}
};

// Update Project Amount
const reviewProjectAmount = async (req, res, next) => {
	let { partialAmount, fullAmount } = req.body;
	try {
		if (!partialAmount || !fullAmount) {
			return res
				.status(403)
				.json({ success: false, msg: "Can't update with empty field" });
		}
		const reviewedProject = await Project.findById({ _id: req.params.id });

		if (!reviewedProject) {
			return res
				.status(404)
				.json({ success: false, msg: "The project does not exist" });
		}

		if (
			reviewedProject.reviewer === null ||
			reviewedProject.reviewer === "" ||
			reviewedProject.reviewer === undefined
		) {
			return res
				.status(404)
				.json({ success: false, msg: "This Project has not been reviewed" });
		} else {
			reviewedProject.partialAmount = partialAmount;
			reviewedProject.fullAmount = fullAmount;
			reviewedProject.approver = req.userId;

			await reviewedProject.save();

			return res.status(200).json({
				success: true,
				msg: "Project amount updated!",
			});
		}
	} catch (err) {
		next(err);
	}
};

//  Update Project Approve
const projectApprove = async (req, res, next) => {
	let { approved } = req.body;
	try {
		if (!approved) {
			return res
				.status(403)
				.json({ success: false, msg: "Can't update with empty field" });
		}

		const reviewedProject = await Project.findById({ _id: req.params.id });

		if (!reviewedProject) {
			return res
				.status(404)
				.json({ success: false, msg: "The project does not exist" });
		}

		if (
			reviewedProject.reviewer === null ||
			reviewedProject.reviewer === "" ||
			reviewedProject.reviewer === undefined
		) {
			return res
				.status(404)
				.json({ success: false, msg: "This Project has not been reviewed" });
		} else {
			reviewedProject.approved = approved;
			reviewedProject.approver = req.userId;

			await reviewedProject.save();

			return res.status(200).json({
				success: true,
				msg: "Project approved!",
			});
		}
	} catch (err) {
		next(err);
	}
};

// Update Project Approver Status
const projectStatus = async (req, res, next) => {
	let { approverRejected } = req.body;
	try {
		if (!approverRejected) {
			return res
				.status(403)
				.json({ success: false, msg: "Can't update with empty field" });
		}

		const reviewedProject = await Project.findById({ _id: req.params.id });

		if (!reviewedProject) {
			return res
				.status(404)
				.json({ success: false, msg: "The project does not exist" });
		}

		if (
			reviewedProject.reviewer === null ||
			reviewedProject.reviewer === "" ||
			reviewedProject.reviewer === undefined
		) {
			return res
				.status(404)
				.json({ success: false, msg: "This Project has not been reviewed" });
		} else {
			reviewedProject.approverRejected = approverRejected;
			reviewedProject.approver = req.userId;

			await reviewedProject.save();

			return res.status(200).json({
				success: true,
				msg: "Project submitted as Rejected!",
			});
		}
	} catch (err) {
		next(err);
	}
};

const getProject = async (req, res, next) => {
	try {
		const project = await Project.findById(req.params.id);
		const reviewer = await User.findById(project.reviewer);
		const initiator = await User.findById(project.initiator);

		if (!project)
			return res
				.status(404)
				.json({ success: false, msg: "No project with that parameter!" });

		res.status(200).json({
			success: true,
			msg: "Project fetched successfully",
			data: { project, initiator, reviewer },
		});
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getApprovalBoard,
	reviewProjectTenor,
	reviewProjectAmount,
	projectApprove,
	projectStatus,
	getProject,
};
