require("dotenv").config();
const nodemailer = require("nodemailer");
const { createTransport } = require("nodemailer");

const transport = createTransport({
	service: "gmail",
	port: 465,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASSWORD,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		refreshToken: process.env.REFRESH_TOKEN,
	}
});

function sendEmail(from, to, subject, html) {
	return transport.sendMail({ from, to, subject, html }, (err, info) => {
		if (err) {
			console.log(err);
		}
		// console.log("Preview URL: %s", info);
		console.log("Message sent: %s", info.messageId);
	});
}

module.exports = sendEmail;
