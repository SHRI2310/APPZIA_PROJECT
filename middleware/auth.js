import jwt  from "jsonwebtoken";
import  Student  from "../models/student.js";

 export const isAuthenticated =async (req,res,next)=>{
    try {
        const {token }= req.cookies;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"login 1st"
            })
        
        } 
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.student=await Student.findById(decoded._id);
        next()
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    
    }
 }