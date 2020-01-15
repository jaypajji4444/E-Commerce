const mongoose=require("mongoose");
const Schema=mongoose.Schema
const itemSchema=new Schema({
   title:String,
   description:String,
   price:Number,
   img:String
})

module.exports=mongoose.model("items",itemSchema)