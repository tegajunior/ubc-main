const dbRole = require("../../config/role.config");
const RefreshToken = dbRole.refreshToken;
const secret = process.env.SECRET_KEY;
let jwtExpiration = 600 // 10 minutes

const refreshTokenCheck = async (req, res, next) => {
	const { refreshToken: requestToken } = req.body;

	if (requestToken == null) {
		return res
			.status(403)
			.json({ success: false, msg: "Refresh Token is required!" });
	}
	try {
		let refreshToken = await RefreshToken.findOne({ token: requestToken });

		if (!refreshToken) {
			return res
				.status(403)
				.json({ success: false, msg: "Refresh Token not in database!" });
		}

		if (RefreshToken.verifyExpiration(refreshToken)) {
			RefreshToken.findByIdAndRemove(refreshToken._id, {
				useFindAndModify: false,
			}).exec();

			 res.status(403).json({
				success: false,
				msg: "Refresh token expired. Please signin to begin a new session",
         });
         return;
      }
      
      let newAccessToken = jwt.sign({ id: refreshToken.user._id }, secret, {
         expiresIn: jwtExpiration  // 10 minutes
      });

      return res.status(200).json({
         success: true,
         accessToken: newAccessToken,
         refreshToken: refreshToken.token
      })
	} catch (err) {
		return res.status(500).json({ success: false, msg: err.message });
	}
};

module.exports = refreshTokenCheck;