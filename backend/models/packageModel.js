import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    bookings: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookingModel",
    }],
  },
  { timestamps: true }
);

export const PackageModel = mongoose.model("PackageModel", packageSchema);