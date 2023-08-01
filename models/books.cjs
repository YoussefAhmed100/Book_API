const mongoose =require("mongoose")
const Schema= mongoose.Schema
const bcrypt=require('bcrypt')


const bookSchema= new Schema({
    name:String,
    auther:String,
    description:String,
    price :Number,
   




})


module.exports=mongoose.model('Books',bookSchema)