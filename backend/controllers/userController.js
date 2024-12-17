import { UserModel } from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
//Register
export const Register=async(req,res)=>{
  try {
    const {name,email,password}=req.body;
    if(!name||!email||!password){
      res.status.json({
        messgae:"Something is missing",
        success:false
      })
    }
    const user=await UserModel.findOne({email});
    if(user){
      return res.status(400).json({
        message:"Email id already registered",
        success:false
      })
    }
    const hashedPassword=await bcrypt.hash(password,10);
   await UserModel.create({
      name,email,password:hashedPassword
    })

    return res.status(200).json({
      message:"User Created Successfully",
      success:true
    })

  } catch (error) {
    console.log(error);
  }
}

//LogIn
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ensure all required fields are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    //Admin Checking
    if(email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD)
    {
       const tokenData = { userId:"admin123"};
       const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
         expiresIn: "1d",
       });

       return res
         .status(200)
         .cookie("token", token, {
           maxAge: 24 * 60 * 60 * 1000, 
           httpOnly: true,
           sameSite: "strict",
         })
         .json({
           message: `Welcome back Admin`,
           success: true,
           user: {
             id: "admin123",
             name: "admin",
             email,
             role:"admin"
           },
         });
    }

    // Fetch user from the database
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password",
        success: false,
      });
    }

    // Compare passwords
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Invalid Email or Password",
        success: false,
      });
    }

    // Generate token
    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Send response with cookie
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.name}`,
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role:"user"
        },
      });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//Log Out
export const logout=async(req,res)=>{
  try {
    return res.status(200).cookie("token","",{maxAge:0}).json({
      message:"Logged Our Successfully",
      success:true
    })
  } catch (error) {
    console.log(error);
  }
}
