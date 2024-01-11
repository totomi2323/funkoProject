const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SeriesSchema = new Schema({
    name:{type: String, required:true, maxLength: 50},
    item: [{type: Schema.Types.ObjectId, ref: "Item", required: true }]
})

SeriesSchema.virtual("url").get(function() {
    return `/series/${this._id}`
})

module.exports = mongoose.model("Series", SeriesSchema)