const dbRole = require("../../config/role.config");
const User = dbRole.user;

const userImageUpload = async (req, res, next) => {
	try {
		let { mediaType } = req.body;

		if (req.file) {
			await cloudinarySetup();

			const uploadedMedia = await cloudinary.uploader.upload(req.file.path, {
				resource_type: "auto",
			});

			imageOrVideo = uploadedMedia.secure_url;
		}

		const newProfile = new Profile({
			user: req.user._id,
			mediaType,
			media: imageOrVideo,
		});

		if (!newProfile)
			return res
				.status(500)
				.json({ success: false, msg: "An error has occurred" });

		await newProfile.save();

		return res.status(201).json({
			success: true,
			msg: "Profile Uploaded",
			newProfile,
		});
	 } catch (err) {
		next(err)
	}
};

const getUserProfile = async (req, res, next) => {
	try {
		const allProfile = await Profile.find({}).populate("user").sort({ _id: -1 });
		if (!allProfile)
			return res.status(404).json({ success: false, msg: "No profile found" });

		return res.status(200).json({
			success: true,
			msg: "All profile",
			allProfile,
		});
	} catch (err) {
		next(err)
	}
};

module.exports = {
   userImageUpload,
	getUserProfile,
};