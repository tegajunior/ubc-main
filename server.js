// load config
require("dotenv").config();
const http = require("http");
const app = require("./app");
const connectDB = require("./config/db.config");

connectDB();

const server = http.createServer(app);

// let PORT = process.env.PORT || 8080;
app.set("port", process.env.PORT || 8080);

server.listen(app.get("port"), () => {
	console.log(`Server running on port http://localhost:${app.get("port")}`);
});