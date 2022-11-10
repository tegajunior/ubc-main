const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema(
	{
		name: String
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("Role", RoleSchema);
