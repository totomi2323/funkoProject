const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2')

const Schema = mongoose.Schema;

const ForSaleSchema = new Schema ({
    item:{type: Schema.Types.ObjectId, ref: "Item", required: true },
    imgUrl: {type:String, required: true},
    available: {type:Schema.Types.ObjectId, ref: "User", required: true},
    price: {type: Number, required:true},
    quantity: {type: Number, required : true},
    contact: {type:String, required: true},
    description: {type:String},
    location: {type:String, required: true},
})



ForSaleSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("ForSale", ForSaleSchema)