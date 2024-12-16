import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  phone:{
    type:String,
  },
  password:{
    type:String,
    required:true
  },
  role:{
    type:String,
    enum:["admin","user"],
    default:"user"
  }
},{timestamps:true})

export const UserModel= mongoose.model('UserModel',UserSchema);