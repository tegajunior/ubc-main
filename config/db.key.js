const dbUrl = () => {
	if (process.env.NODE_ENV === "production") {
		return process.env.PROD_MONGODB_URI;
	} else {
		return process.env.DEV_MONGOBD_URI;
	}
};

module.exports = dbUrl;