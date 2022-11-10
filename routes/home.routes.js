const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
	try {
		res
			.status(200)
			.json({ success: true, msg: "Hello, Welcome to the UBEC WORK FLOW DESK" });
	} catch (err) {
		res.status(500).json({ success: false, msg: err.message });
	}
});

module.exports = router;
