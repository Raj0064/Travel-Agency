import { BookingModel } from "../models/BookingModel.js";
import { PackageModel } from "../models/PackageModel.js";

export const BookingPackage = async (req, res) => {
  try {
    const packageId = req.params.id;
    console.log(packageId);

    const Package = await PackageModel.findById(packageId);

    if (!Package) {
      return res.status(400).json({
        message: "Invalid Package",
        success: false,
      });
    }
    const { name, email, number, travelersNumber, specialrequest } = req.body;
    if (!name || !email || !number || !travelersNumber) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const booking = await BookingModel.create({
      name,
      email,
      number,
      travelersNumber,
      specialrequest,
      package: packageId,
    });

    Package.bookings.push(booking._id);
    await Package.save();

    return res.status(200).json({
      message: "Package booked successfully",
      success: true,
      booking,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getAllBookingsForPackage = async (req, res) => {
  try {
    const packageId = req.params.id;
    if (!packageId) {
      return res.status(400).json({
        message: "PackageId not found",
        success: false,
      });
    }
    const bookings = await BookingModel.find({ package: packageId });

    return res.status(200).json({
      message: "All bookings found",
      bookings,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
