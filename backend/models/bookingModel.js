import mongoose from "mongoose";

const bookingSchema=new mongoose.Schema({
  // applicant:{
  //   type:mongoose.Schema.Types.ObjectId,
  //   ref:"UserModel",
  //   required:true
  // },
  name:{
    type:String
  },
  email:{
    type:String
  },
  number:{
    type:String
  },
  travelersNumber:{
    type:Number,
    required:true
  },
  specialrequest:{
    type:String,
  },
  invoice:{
    type:String
  }
},{timestamps:true})

export const BookingModel=mongoose.model("BookingModel",bookingSchema);