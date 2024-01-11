const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const ItemSchema = new Schema ({
    name: {type: String, required: true, minLength: 1},
    imgUrl: {type:String, required: true},
    series: {type: Schema.Types.ObjectId, ref:"Series", required: true},
    available: {type:Schema.Types.ObjectId, ref: "User", required: true},
    price: {type: Number, required:true},
    alt: {type:String, required: true}
})

ItemSchema.virtual("url").get(function() {
        return `/item/${this._id}`
})

module.exports = mongoose.model("Item", ItemSchema)