import express from "express";
import { createNewpackage } from "../controllers/packageController.js";

const router = express.Router();

router.route("/packages").post(createNewpackage);

export default router;
