import { PackageModel } from "../models/PackageModel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "./../utils/datauri.js";

export const getAllPackages = async (req, res) => {
  try {
    const packages = await PackageModel.find().sort({ createdAt: -1 });

    if (!packages) {
      return res.status(400).json({
        message: "Packages not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Packages Found",
      packages,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPackageById = async (req, res) => {
  try {
    const packageId = req.params.id;
    console.log(packageId);
    const singlePackage = await PackageModel.findById(packageId);
    if (!singlePackage) {
      return res.status(400).json({
        message: "Tour Package not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Tour Package found",
      singlePackage,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createNewpackage = async (req, res) => {
  try {
    const { title, description, price, startDate, endDate } = req.body;
    const file = req.file;

    if (!title || !description || !price || !startDate || !endDate) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    if (new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({
        success: false,
        message: "End date must be after or equal to start date.",
      });
    }
    //Cloudinary

    const fileUrl = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUrl.content);
    const imageUrl = cloudResponse.secure_url;

    const newpackage = await PackageModel.create({
      title,
      description,
      price,
      startDate,
      endDate,
      imageUrl,
    });
    return res.status(200).json({
      message: "Tourist package Created Successfully",
      newpackage,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePackageById = async (req, res) => {
  try {
    const packageId = req.params.id;
    let singlePackage = await PackageModel.findById(packageId);
    if (!singlePackage) {
      return res.status(400).json({
        message: "Tourist package Not Found",
        newpackage,
        success: false,
      });
    }
    const { title, description, price, dates } = req.body;

    //Cloudinary
    const updateData = { title, description, price, dates };
    singlePackage = await PackageModel.findByIdAndUpdate(
      packageId,
      updateData,
      { new: true }
    );
    return res.status(200).json({
      message: "Tourist package Updated Successfully",
      singlePackage,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const DeletePackageById = async (req, res) => {
  try {
    const packageId = req.params.id;
    console.log(packageId);
    
    const packagedata=await PackageModel.findByIdAndDelete(packageId);
    if(!packagedata)
    {
          return res.status(400).json({
            message: "Invalid Package",
            success: false,
          });
    }
    return res.status(200).json({
      message: "Tourist Package deleted Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
