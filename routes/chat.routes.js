const express = require('express');
const router = express.Router();
// const verify = require('../middleware/authJwt');
const upload = require('../config/multer.config');

const {
	getUserProfile,
	userImageUpload,
} = require("../controllers/chat/chat.controller");


router.route('/profile')
    .post(upload.single('postMedia'), userImageUpload)
    .get(getUserProfile);




module.exports = router;
