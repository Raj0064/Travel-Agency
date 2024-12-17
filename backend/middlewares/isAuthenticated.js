import jwt from "jsonwebtoken";
const isAuthenticated=async(req,res,next)=>{
  try {
    const token=req.cookies.token;
    if(!token){
      return res.status(400).json({
        message:"User Not Authenticated",
        success:false
      })
    }
    const decode=jwt.verify(token,process.env.SECRET_KEY);

    if(!decode){
      res.status(400).json({
        message:"Invalid Token",
        success:false
      })
    }
    else{
      req.id=req.user;
      next();
    }
  } catch (error) {
    console.log(error);
  }
}
export default isAuthenticated;