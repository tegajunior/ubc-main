const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		firstname: String,
		lastname: String,
		middlename: String,
		email: {
			type: String,
			unique: true
		},
		phone: String,
		staffnum: String,
		department: String,
		jobTitle: String,
		dateOfBirth: String,
		gender: String,
		grade: String,
		stateOfOrigin: String,
		localGovt: String,
		employmentLocation: String,
		employmentDate: String,
		pencomNumber: String,
		nhf: String,
		password: String, 
		secretToken: String,
		active: Boolean,
		avatar: String,
		roles: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Role",
			},
		],
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("User", UserSchema);
