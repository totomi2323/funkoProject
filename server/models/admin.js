const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    name:{type: String, required: true, maxLength: 100 },
    password: {type:String, required: true, minLength: 8},
})

module.exports = mongoose.model("Admin", AdminSchema)