const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema(
	{
		title: String,
		location: String,
		image: String,
		purpose: String,
		tenor: String,
		partialAmount: String,
		fullAmount: String,
		companyName: String,
		companyWebsite: String,
		companySummary: String,
		bidDocument: String,
		executiveSummary: String,
		offerDocument: String,
		verificationDocument: String,
		preferredModeOFPayment: String,
		titleOfAccount: String,
		bankName: String,
		bankAccountNumber: String,
		uniqueCode: String,
		classificationCode: String,
		reviewerRejected: {
			type: Boolean,
		},
		approverRejected: {
			type: Boolean,
		},
		reviewed: {
			type: Boolean,
			default: false,
		},
		approved: {
			type: Boolean,
			default: false,
		},
		initiator: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
		reviewer: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
		approver: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("project", ProjectSchema);
