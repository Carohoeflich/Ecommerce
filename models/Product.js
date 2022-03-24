const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title:{type: String, require:true},
    description:{type:String, require:true},
    img:{type:String, required:true},
    category:{type:Array},
    size:{type:String},
    color:{type:String},
    prize:{type:Number, required:true},
},
{timestamps:true});

module.exports = mongoose.model("Product", ProductSchema);