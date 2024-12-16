import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"
import packagesRoute from "./routes/packagesRoutes.js"
import cors from "cors"

const app=express();
dotenv.config()

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOption={
  origin:"http://localhost:5173",
  credentials:true
}
app.use(cors(corsOption));

const PORT = process.env.PORT || 8000;

//routes
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/admin",packagesRoute);

app.listen(PORT,()=>{
  connectDb();
  console.log(`App is running on port ${PORT}`)
})