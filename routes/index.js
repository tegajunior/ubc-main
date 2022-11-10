const homeRouter = require("./home.routes");
const authRouter = require("./auth.routes");
const userRouter = require("./user.routes");
const initiatorRouter = require("./initiator.routes");
const reviewerRouter = require("./reviewer.routes");
const approverRouter = require("./approver.routes");
const adminRouter = require("./admin.routes");
const fileRouter = require("./file.routes");
const avatarRouter = require("./avatar.routes");
const conversationRouter = require("./conversation.routes");
const messagesRouter = require("./messages.routes");


const routers = (app) => {
	app.use((req, res, next) => {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept",
		);
		next();
	});
  
	app.use("/api/v1", homeRouter);
	app.use("/api/v1/auth", authRouter);
	app.use("/api/v1/users", userRouter);
	app.use("/api/v1/initiator", initiatorRouter);
	app.use("/api/v1/reviewer", reviewerRouter);
	app.use("/api/v1/approver", approverRouter);
	app.use("/api/v1/admin", adminRouter);
	app.use("/api/v1/files", fileRouter);
	app.use("/api/v1/avatar", avatarRouter);
	app.use("/api/v1/conversations", conversationRouter); 
	app.use("/api/v1/messages", messagesRouter);

};

module.exports = routers;
