import { BookingModel } from "../models/bookingModel";

export const Booking=async(req,res)=>{
  try {
    const {name,email,number,travelersNumber,specialrequest}=req.body;
    if(!name||!email||!number||!travelersNumber){
      return res.status(400).json({
        message:"Something is missing",
        success:false
      })
    }
    const booking = await BookingModel.create({
      name,
      email,
      number,
      travelersNumber,
      specialrequest,
    });
    return res.status(200).json({
      message: "Package booked successfully",
      success: true,
      booking
    });

  } catch (error) {
    console.log(error)
  }
}
