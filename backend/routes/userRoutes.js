import express from "express";
import { Login, logout, Register } from "../controllers/userController.js";
import { getAllPackages, getPackageById } from "../controllers/packageController.js";
import { BookingPackage } from "../controllers/bookingController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

  const router = express.Router();
  router.route("/register").post(Register);
  router.route("/login").post(Login);
  router.route("/logout").post(logout);

  router.route("/packages/get").get(getAllPackages);
  router.route("/packages/get/:id").get(getPackageById);
  router.route("/booking/:id").post(isAuthenticated,BookingPackage);

export default router;