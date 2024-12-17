import express from "express";
import { createNewpackage, DeletePackageById, getAllPackages, getPackageById, updatePackageById } from "../controllers/packageController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
import { getAllBookingsForPackage } from "../controllers/bookingController.js";

const router = express.Router();

router.route("/packages").post(isAuthenticated,singleUpload,createNewpackage);

router.route("/packages/:id").put(isAuthenticated,singleUpload,updatePackageById);

router.route("/packages/:id").get(isAuthenticated,getPackageById);

router.route("/packages/:id").delete(isAuthenticated,DeletePackageById);

router.route("/bookings/:id").get(isAuthenticated, getAllBookingsForPackage);

export default router;
