const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2')

const Schema = mongoose.Schema;

const ForSaleSchema = new Schema ({
    name: {type: String, required: true, minLength: 1},
    imgUrl: {type:String, required: true},
    series: [{type: Schema.Types.ObjectId, ref:"Series", required: true}],
    available: [{type:Schema.Types.ObjectId, ref: "User", required: true}],
    price: {type: Number, required:true},
    alt: {type:String, required: true},
    quantity: {type: Number, required : true}
})

ForSaleSchema.virtual("url").get(function() {
        return `/item/${this._id}`
})

ForSaleSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("ForSale", ForSaleSchema)