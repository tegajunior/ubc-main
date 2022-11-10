const db = require("../../config/role.config");
const Message = db.message;

const addMessage = async (req, res, next) => {
	try {
		if (
			!req.body ||
			req.body === "" ||
			req.body === null ||
			req.body === undefined
		) {
			return res
				.status(409)
				.json({ success: false, msg: "Kindly type in a message" });
		}

		const newMessage = new Message(req.body);

		const savedMessage = await newMessage.save();
		if (!savedMessage) {
			return res.status(409).json({ success: false, msg: "Message not sent" });
		}
		res.status(200).json({ success: true, msg: "Message sent", savedMessage });
	} catch (err) {
		next(err);
	}
};

const getMessage = async (req, res, next) => {
	try {
		// console.log(req.params);
		if(!req.params.conversationId) return;

		const messages = await Message.find({
			conversationId: req.params.conversationId,
		});
		res.status(200).json({ success: true, messages });
	} catch (err) {
		next(err);
	}
};

const getNotify = async (req, res, next) => {
	// console.log(req.params);
	try {
		if (!req.params.id) return;

		const messageAlert = await Message.find({
			conversationId: req.params.id,
		}).sort({ createdAt: -1 })
		// console.log(messageAlert);

		res.status(200).json({
			success: true,
			msg: "Data fetched successfully",
			messageAlert,
		});
	} catch (err) {
		next(err);
	}
};

module.exports = {
	addMessage,
	getMessage,
	getNotify,
};
