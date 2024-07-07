const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleId: { type: String, required: true, maxLength: 100 },
  name: { type: String, required: true, maxLength: 100 },
  nickName: { type: String, required: true, maxLength: 100 },
  email: { type: String, required: true, maxLength: 100 },
  password: { type: String },
  wishlist: [{ type: Schema.Types.ObjectId, ref: "Item", required: true }],
  userCollection: [
    { type: Schema.Types.ObjectId, ref: "UserCollection", required: true },
  ],
  sale: [{ type: Schema.Types.ObjectId, ref: "ForSale", required: true }],
  token: { type: String, required: true },
  contact: [{
    name: { type: String, required: true },
    details: { type: String, required: true },
  }],
});

module.exports = mongoose.model("User", UserSchema);
