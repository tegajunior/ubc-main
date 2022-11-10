const express = require("express");
// const path = require("path");
const logger = require("morgan");
const helmet = require("helmet");
const routers = require("./routes/index");
const cors = require("cors");
const app = express();

const corsOptions = {
	Credentials: true,
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // to give extra layer of security

app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

routers(app);

app.use(logger("dev"));

module.exports = app;
