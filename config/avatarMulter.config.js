const mongoose = require("mongoose");
const multer = require("multer");
const  {GridFsStorage} = require("multer-gridfs-storage");
const crypto = require("crypto");
const path = require("path");
const db_key = require("./db.key");

let storage = new GridFsStorage({
	url:db_key(),
	options: { useUnifiedTopology: true },
	file: (req, file) => {
		// this function runs every time a new file is created
		return new Promise((resolve, reject) => {
			// use the crypto package to generate some random hex bytes
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				// turn the random bytes into a string and add the file extention at the end of it (.png or .jpg)
				// this way our file names will not collide if someone uploads the same file twice
				const filename = buf.toString("hex") + path.extname(file.originalname);
				const fileInfo = {
					filename: filename,
					bucketName: "avatars",
				};
				// resolve these properties so they will be added to the new file document
				resolve(fileInfo);
			});
		});
	},
});

function checkFileType(file, cb) {
	// define a regex that includes the file types we accept
	const filetypes = /jpeg|jpg|png|jfif/;

	//check the file extention
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// more importantly, check the mimetype
	const mimetype = filetypes.test(file.mimetype);
	// if both are good then continue
	if (mimetype && extname) return cb(null, true);
	// otherwise, return error message
	cb("filetype");
}

// set up our multer to use the gridfs storage defined above
const store = multer({
	storage,
	limits: { fileSize: 10000000 }, // limit the size to 10mb for any files coming in
	// filer out invalid filetypes
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
});

const uploadMiddleware = (req, res, next) => {
	const upload = store.single("image");
	upload(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			return res.status(400).json({ success: false, msg:"File too large"});
		} else if (err) {
			// check if our filetype error occurred
			if (err === "filetype") return res.status(400).json({ success: false, msg:"Image files only"});
			// An unknown error occurred when uploading.
			return res.status(500).json({ success: false, msg: "Something went wrong" });
		}
		// all good, proceed
		next();
	});
};

module.exports = uploadMiddleware;
