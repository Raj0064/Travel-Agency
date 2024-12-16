import { PackageModel } from "../models/packageModel.js";


export const getAllPackages=async(req,res)=>{
  try {
    const packages=await PackageModel.find().sort(-1);
    if(!packages){
      return res.status(400).json({
        message:"Packages not found",
        success:false
      })
    }
    return res.status(200).json({
      message:"Packages Found",
      packages,
      success:true
    })

  } catch (error) {
    console.log(error);
    
  }
}

export const getPackageById=async (req,res)=>{
  try {
    const packageId=req.params.id;
    const singlePackage = await PackageModel.findById(packageId);
    if(!singlePackage){
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
}


export const createNewpackage=async(req,res)=>{
  try {
     const { title, description, price, dates } = req.body;
     if (!title || !description || !price || !dates) {
       return res.status(400).json({
         message: "Something is missing",
         success: false,
       });
     }
     //Cloudinary

     const newpackage = await PackageModel.create({
       title,
       description,
       price,
       dates,
     });
     return res.status(200).json({
       message: "Tourist package Created Successfully",
       newpackage,
       success: true,
     });
  } catch (error) {
    console.log(error)
  }
}

export const updatePackageById=async(req,res)=>{
  try {
    const packageId=req.params.id;
    const singlePackage=await PackageModel.findById(packageId);
    if(!singlePackage){
      return res.status(400).json({
        message: "Tourist package Not Found",
        newpackage,
        success: false,
      });
    }
    const { title, description, price, dates } = req.body;
    
     //Cloudinary
    const updateData = { title, description, price, dates };
    singlePackage= await PackageModel.findByIdAndUpdate(packageId,updateData,{new:true});
     return res.status(200).json({
       message: "Tourist package Updated Successfully",
       singlePackage,
       success: true,
     });
  } catch (error) {
    console.log(error)
  }
}

export const DeletePackageById=async(req,res)=>{
  try {
    const packageId=req.params.id;
    await PackageModel.findByIdAndDelete(packageId);
    return res.status(200).json({
      message:"Tourist Package deleted Successfully",
      success:true
    })
  } catch (error) {
    console.log(error);
  }
}
