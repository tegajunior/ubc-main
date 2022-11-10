// const Project = require("../../models/Project.model");
const db = require("../../config/role.config");
const Project = db.project;
const User = db.user;

const getReviewerBoard = async (req, res, next) => {
	try {
		const user = await User.findById(req.userId).populate("roles");

		const totalNumProject = await Project.find({}).countDocuments();
		const totalDenied = await Project.find({ reviewer: req.userId })
			.where("reviewed")
			.equals(false)
			.countDocuments();

		const totalApproved = await Project.find({ reviewer: req.userId })
			.where("approved")
			.equals(true)
			.countDocuments();

		const { password, secretToken, ...userData } = user._doc;

		return res.status(200).json({
			success: true,
			msg: "User fetched successfully",
			user: {
				...userData,
			},
			totalNumProject,
			totalDenied,
			totalApproved,
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

		if (!reviewedProject) {
			return res
				.status(404)
				.json({ success: false, msg: "The project does not exist" });
		}

		reviewedProject.tenor = tenor;
		reviewedProject.reviewer = req.userId;

		await reviewedProject.save();

		return res.status(200).json({
			success: true,
			msg: "Project tenor updated!",
		});
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

		reviewedProject.partialAmount = partialAmount;
		reviewedProject.fullAmount = fullAmount;
		reviewedProject.reviewer = req.userId;

		await reviewedProject.save();

		return res.status(200).json({
			success: true,
			msg: "Project amount updated!",
		});
	} catch (err) {
		next(err);
	}
};

// Update Project Review
const projectReview = async (req, res, next) => {
	let { reviewed } = req.body;
	try {
		if (reviewed) {
			const reviewedProject = await Project.findById({ _id: req.params.id });
			if (!reviewedProject) {
				return res
					.status(404)
					.json({ success: false, msg: "The project does not exist" });
			}
			reviewedProject.reviewed = reviewed;
			reviewedProject.reviewer = req.userId;

			await reviewedProject.save();

			return res.status(200).json({
				success: true,
				msg: "Project submitted as Reviewed!",
			});
		}
		return res
			.status(403)
			.json({ success: false, msg: "Can't update with empty field" });
	} catch (err) {
		next(err);
	}
};

// Update Project Reviewer Status
const projectStatus = async (req, res, next) => {
	let { reviewerRejected } = req.body;
	try {
		if (reviewerRejected) {
			const reviewedProject = await Project.findById({ _id: req.params.id });
			if (!reviewedProject) {
				return res
					.status(404)
					.json({ success: false, msg: "The project does not exist" });
			}
			reviewedProject.reviewerRejected = reviewerRejected;
			reviewedProject.reviewer = req.userId;

			await reviewedProject.save();

			return res.status(200).json({
				success: true,
				msg: "Project submitted as Rejected!",
			});
		}
		return res
			.status(403)
			.json({ success: false, msg: "Can't update with empty field" });
	} catch (err) {
		next(err);
	}
};

const getProject = async (req, res, next) => {
	try {
		const project = await Project.findById(req.params.id);
		const initiator = await User.findById(project.initiator);

		if (!project)
			return res
				.status(404)
				.json({ success: false, msg: "No project with that parameter!" });

		res.status(200).json({
			success: true,
			msg: "Project fetched successfully",
			data: { project, initiator },
		});
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getReviewerBoard,
	reviewProjectTenor,
	reviewProjectAmount,
	getProject,
	projectReview,
	projectStatus,
};
