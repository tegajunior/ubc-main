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
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const filename = buf.toString("hex") + path.extname(file.originalname);
				const fileInfo = {
					filename: filename,
					bucketName: "uploads",
				}; 
				resolve(fileInfo);
			});
		});
	},
});

// function checkFileType(file, cb) {
// 	const filetypes = /jpeg|jpg|png|pdf/;

// 	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
// 	const mimetype = filetypes.test(file.mimetype);

// 	if (mimetype && extname) return cd(null, true);
// 	cb('filetype');
// }

// set up our multer to use the gridfs storage defined above
const store = multer({
	storage,
	// limits: { fileSize: 20000000 }, // limit the size to 20mb for any files coming in
	// fileFilter: function (req, file, cb) {
	// 	checkFileType(file, cb);
	// }
});

module.exports = store;
