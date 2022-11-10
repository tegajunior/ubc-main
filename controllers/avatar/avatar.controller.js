const db = require("../../config/role.config");
const User = db.user;
const mongoose = require("mongoose");
const db_key = require("../../config/db.key");

const conn = mongoose.createConnection(db_key(), {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

let gfs;

conn.once("open", () => {
	gfs = new mongoose.mongo.GridFSBucket(conn.db, {
		bucketName: "avatars",
	});
});

const createUserAvatar = async (req, res) => {
	try {
		// get the .file property from req that was added by the upload middleware
		const { file } = req;

		// and the id of that new image file
		const { id } = file;
		// we can set other, smaller file size limits on routes that use the upload middleware
		// set this and the multer file size limit to whatever fits your project
		if (file.size > 10000000) {
			// if the file is larger than 10mb, delete it and send an error
			deleteImage(id);
			return res
				.status(400)
				.json({ success: false, msg: "file may not exceed 10mb" });
		}

		const user = await User.findById(req.userId);

		if (!user) {
			return res.status(404).json({
				success: false,
				msg: "No valid user found",
			});
		}

		user.avatar = file.id;

		await user.save();

		return res.status(201).json({
			success: true,
			msg: "User Image Uploaded",
			file: file.id,
		});
	} catch (err) {
		return res.status(500).json({ success: false, msg: "Something went wrong" });
	}
};

const deleteImage = (id) => {
	if (!id || id === "undefined")
		return res.status(404).json({ success: false, msg: "No image found" });
	const _id = new mongoose.Types.ObjectId(id);
	gfs.delete(_id, (err) => {
		if (err)
			return res.status(500).json({ success: false, msg: "Something went wrong" });
	});
};

// this route will be accessed by any img tags on the front end which have
// src tags like
// <img src="/api/avatar/image/123456789" alt="example"/>
// <img src={`/api/avatar/image/${user.avatar}`} alt="example"/>
const getUserAvatar = async (req, res) => {
   const { id} = req.params;
	try {
		// if no id return error
		if (!id || id === "undefined")
			return res.status(404).json({ success: false, msg: "No image found" });
		// if there is an id string, cast it to mongoose's objectId type
		const _id = new mongoose.Types.ObjectId(req.params.id);
		// search for the image by id
		gfs.find({ _id }).toArray((err, files) => {
			if (!files || files.length === 0)
				return res.status(404).json({ success: false, msg: "No image found" });
			// if a file exists, send the data
			gfs.openDownloadStream(_id).pipe(res);
		});
	} catch (err) {
      return res.status(500).json({ success: false, msg: "Something went wrong" });
   }
};

module.exports = { createUserAvatar, getUserAvatar };
