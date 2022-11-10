const db = require("../../config/role.config");
const Project = db.project;
const mongoose = require("mongoose");
const randomstring = require("randomstring");
const db_key = require("../../config/db.key");

const conn = mongoose.createConnection(db_key(), {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

let gfs;

conn.once("open", () => {
	gfs = new mongoose.mongo.GridFSBucket(conn.db, {
		bucketName: "uploads",
	});
});

const createNewProject = async (req, res, next) => {
	try {
		const {
			title,
			location,
			purpose,
			tenor,
			partialAmount,
			fullAmount,
			companyName,
			companyWebsite,
			companySummary,
			preferredModeOFPayment,
			titleOfAccount,
			bankName,
			bankAccountNumber,
		} = req.body;

		if (
			!title ||
			!location ||
			!purpose ||
			!tenor ||
			!partialAmount ||
			!fullAmount ||
			!companyName ||
			!companyWebsite ||
			!companySummary ||
			!preferredModeOFPayment ||
			!titleOfAccount ||
			!bankName ||
			!bankAccountNumber
		) {
			return res
				.status(400)
				.json({ success: false, msg: "Please fill all fields" });
		}

		if (!req.files) {
			return res
				.status(400)
				.json({ success: false, msg: "Please upload all useful documents" });
		}

		const uniqueAcronym = location
			.match(/\b(\w)/g)
			.join("")
			.toUpperCase();

		const classificationCodeAcronym = purpose
			.match(/\b(\w)/g)
			.join("")
			.toUpperCase();

		let generatedUniqueCode = await randomstring.generate({
			length: 6,
			charset: "numeric",
			capitalization: "lowercase",
		});

		let generatedClassificationCode = await randomstring.generate({
			length: 5,
			charset: "numeric",
			capitalization: "lowercase",
		});

		const newProject = new Project({
			title,
			location,
			image: req.files["image"][0].id,
			purpose,
			tenor,
			partialAmount,
			fullAmount,
			companyName,
			companyWebsite,
			companySummary,
			bidDocument: req.files["bidFile"][0].id,
			executiveSummary: req.files["executiveSummary"][0].id,
			offerDocument: req.files["offerDocument"][0].id,
			verificationDocument: req.files["verificationDocument"][0].id,
			preferredModeOFPayment,
			titleOfAccount,
			bankName,
			bankAccountNumber,
			uniqueCode: uniqueAcronym + generatedUniqueCode,
			classificationCode: classificationCodeAcronym + generatedClassificationCode,
			initiator: req.userId,
		});

		if (!newProject) {
			return res
				.status(500)
				.json({ success: false, msg: "An error has occurred" });
		}

		await newProject.save();

		return res.status(201).json({
			success: true,
			msg: "Project initiated successfully",
			newProject,
		});
	} catch (err) {
		next(err)
	}
};

const getAllProject = async (req, res, next) => {
	try {
		const allProjects = await Project.find({}).sort({ createdAt: -1 });
		if (!allProjects) {
			return res.status(500).json({ success: false, msg: "No project found" });
		}

		return res.status(200).json({
			success: true,
			msg: "All projects",
			project: allProjects,
		});
	} catch (err) {
		next(err)
	}
};

//  Get Projects documents/media
//  Get all Project media files object
const getAllMediaFiles = async (req, res, next) => {
	try {
		gfs.files.find().toArray((err, files) => {
			if (!files || files.length === 0) {
				return res.status(404).json({
					success: false,
					msg: "No files exist",
				});
			}
			return res.status(201).json({
				success: true,
				msg: "All project media files",
				files: files,
			});
		});
	} catch (err) {
		next(err)
	}
};

//  Get /image/:id
//  Display project image
const getAndDisplayProjectImage = async (req, res, next) => {
	const { id } = req.params;
	try {
		// if no id return error
		if (!id || id === "undefined") return res.status(400).send("no image id");
		// if there is an id string, cast it to mongoose's objectId type
		const _id = new mongoose.Types.ObjectId(id);
		// search for the image by id
		gfs.find({ _id }).toArray((err, files) => {
			if (!files || files.length === 0) {
				return res.status(404).json({
					success: false,
					msg: `No file exists: ${err}`,
				});
			}
			// if a file exists, send the data
			gfs.openDownloadStream(_id).pipe(res);
		});
	} catch (err) {
		next(err)
	}
};

//  Get /file/:id
//  Display single file
const getAndDisplayProjectFile = async (req, res, next) => {
	const { id } = req.params;
	try {
		// if no id return error
		if (!id || id === "undefined") return res.status(404).send("no image id");
		// if there is an id string, cast it to mongoose's objectId type
		const _id = new mongoose.Types.ObjectId(id);
		// search for the image by id
		gfs.find({ _id }).toArray((err, files) => {
			if (!files || files.length === 0) {
				return res.status(404).json({
					success: false,
					msg: `No file exists: ${err}`,
				});
			}
			// if a file exists, send the data
			gfs.openDownloadStream(_id).pipe(res);
		});
	} catch (err) {
		next(err)
	}
};

//  Delete /file/:id
//  delete file
const deleteFile = async (req, res, next) => {
	try {
		await gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
			if (err) {
				return res.status(404).json({ success: false, msg: err });
			}

			res.status(200).json({ success: true, msg: "Item deleted" });
		});
	} catch (err) {
		next(err)
	}
};

module.exports = {
	getAllMediaFiles,
	getAndDisplayProjectImage,
	getAndDisplayProjectFile,
	createNewProject,
	getAllProject,
	deleteFile,
};
