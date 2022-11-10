const db = require("../../config/role.config");
const Conversation = db.conversation;

// initiate conversation
const createConversation = async (req, res, next) => {
	const newConversation = new Conversation({
		members: [req.userId, req.body.receiverId],
	});

	try {
		if (req.body.receiverId === req.userId) {
			return res
				.status(409)
				.json({ success: false, msg: "Can't create a conversation with self" });
		}

		const conversation = await Conversation.findOne({
			members: { $all: [req.userId, req.body.receiverId] },
		});

		if (conversation) {
			return;
		}

		const savedConversation = await newConversation.save();

		res
			.status(200)
			.json({ success: true, msg: "Conversation initiated", savedConversation });
	} catch (err) {
		next(err);
	}
};

//  Get a user conversation
const userConversation = async (req, res, next) => {
	try {
		const conversation = await Conversation.find({
			members: { $in: [req.userId] },
		});
		if (!conversation) {
			return res
				.status(404)
				.json({ success: false, msg: "Conversation not found" });
		}
		res.status(200).json({ success: true, conversation });
	} catch (err) {
		next(err);
	}
};

// get conversation for multi users
const multipleConversation = async (req, res, next) => {
	try {
		const conversation = await Conversation.findOne({
			members: { $all: [req.params.firstUserId, req.params.secondUserId] },
		});

		if (!conversation) {
			return res
				.status(404)
				.json({ success: false, msg: "Conversation not found" });
		}

		res.status(200).json({ success: true, conversation });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	createConversation,
	userConversation,
	multipleConversation,
};
