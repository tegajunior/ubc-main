const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("../models/User.model");
db.role = require("../models/Role.model");
db.project = require("../models/Project.model");
db.message = require("../models/Message.model");
db.conversation = require("../models/Conversation.model");
////* dbRole.refreshToken = require("../models/RefreshToken.model"); */

db.ROLES = ["user", "initiator", "reviewer", "approver", "admin"];

module.exports = db;