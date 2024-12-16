import mongoose from "mongoose";

const packageSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  dates:{
    type:String,
    required:true
  },
  imageUrl:{
    type:String,
  }
},{timestamps:true});

export const PackageModel = mongoose.model("PackageModel", packageSchema);