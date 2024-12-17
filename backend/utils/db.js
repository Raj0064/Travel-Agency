import mongoose from "mongoose";
const connectDb=async()=>{
  try {
    const res = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Mongo Db connected");
    
  } catch (error) {
    console.log(error);
  }
  
}
export default connectDb;