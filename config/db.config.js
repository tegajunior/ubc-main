const mongoose = require("mongoose");
const dbRole = require("./role.config");
const db_key = require("./db.key");

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(db_key(), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log(`MongoDb Connected:::: ${conn.connection.host}`);

		initiateRoles();

	} catch (err) {
		console.error("DATABASE_CONNECTION_ERROR:::", err);
		process.exit(1);
	}
};

// User role creation
const Role = dbRole.role;

const initiateRoles = () => {
	Role.estimatedDocumentCount((err, count) => {
		if (!err && count === 0) {
			new Role({
				name: "user",
			}).save((err) => {
				if (err) {
					console.log("error", err);
				}

				console.log("added 'user' to roles collection");
			});

			new Role({
				name: "initiator",
			}).save((err) => {
				if (err) {
					console.log("error", err);
				}

				console.log("added 'initiator' to roles collection");
			});

			new Role({
				name: "reviewer",
			}).save((err) => {
				if (err) {
					console.log("error", err);
				}

				console.log("added 'reviewer' to roles collection");
			});

			new Role({
				name: "approver",
			}).save((err) => {
				if (err) {
					console.log("error", err);
				}

				console.log("added 'approver' to roles collection");
			});

			new Role({
				name: "admin",
			}).save((err) => {
				if (err) {
					console.log("error", err);
				}

				console.log("added 'admin' to roles collection");
			});
		}
	});
};

module.exports = connectDB;
