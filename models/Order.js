const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId:{type: String, require:true},
    products:[{
        productId:{type:String},
        quantity: {type:Number,default:1},
    },],
    amount:{type:Number, required:true},
    address:{type:Object, require:true},
    status: {type:String, default:"On the way!"},
},
{timestamps:true});

module.exports = mongoose.model("Order", OrderSchema);