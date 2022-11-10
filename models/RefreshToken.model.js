const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

let jwtRefreshExpiration = 900; // 15 minutes

const RefreshtokenSchema = new mongoose.Schema({
   token: String,
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
   },
   expiryDate: Date,
});

RefreshtokenSchema.statics.createToken = async function (user) {
   let expiredAt = new Date();

   expiredAt.setSeconds(
      expiredAt.getSeconds() + jwtRefreshExpiration
   );

   let _token = uuidv4();

   let _object = new this({
      token: _token,
      user: user._id,
      expiryDate: expiredAt.getTime()
   });

   console.log(_object);

   let refreshToken = await _object.save();

   return refreshToken.token;
}

RefreshtokenSchema.statics.verifyExpiration = (token) => {
   return token.expiryDate.getTime() < new Date().getTime();
}

const Refreshtoken = mongoose.model("refreshToken", RefreshtokenSchema);

module.exports = Refreshtoken;