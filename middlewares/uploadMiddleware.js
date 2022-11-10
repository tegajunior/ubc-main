const multer = require("multer");
const store = require("../config/multer.config");

const uploadMiddleware = (req, res, next) => {
	const upload = store.single("image");
	upload(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			return res
				.status(400)
				.json({ success: false, msg: "File larger then 20mb" });
		} else if (err) {
			if (err === "filetype")
				return res
					.status(400)
					.json({ success: false, msg: "Image or pdf files only" });
			return res.sendStatus(500);
		}

		next();
	});
};

module.exports = uploadMiddleware;
