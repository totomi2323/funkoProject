const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const UserSchema = new Schema({
    googleId:{type: String, required: true, maxLength: 100 },
    name:{type: String, required: true, maxLength: 100 },
    email:{type: String, required: true, maxLength: 100 },
    wishlist:[{type: Schema.Types.ObjectId, ref: "Item", required: true }],
    userCollection:[{type: Schema.Types.ObjectId, ref: "UserCollection", required: true }],
    sale:[{type: Schema.Types.ObjectId, ref: "Item", required: true }],
})

module.exports = mongoose.model("User", UserSchema)