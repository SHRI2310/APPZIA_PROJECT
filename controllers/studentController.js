import Student from "../models/student.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { uploadFile } from "../utils/aws.js";


export const registerStudent =  async (req,res)=>{
    try {
        let data=req.body
        let {name,DOB,contact,email,password}= data;

        let files=req.files

        console.log(name,DOB,contact,email,password)
        console.log(files.toString(),"i am file");

        let student = await Student.findOne({email})
        if(student){
            return res.status(400).json({
                success:false,
                message:"Student already exists with same email"
            })

        }


        let imgUrl = await uploadFile(files[0]);
        console.log(imgUrl);

        const salt = await bcrypt.genSalt(10)
        data.password= await bcrypt.hash(password,salt)

        
        
      data.image=imgUrl
        student = await Student.create( data )

         let token = jwt.sign({
            _id:student._id,
         },process.env.JWT_SECRET);


         let options= {
            httpOnly:true,
            expires: new Date(Date.now()+ 10*24*60*60*1000)
         }

       return res.status(201).cookie("token",token,options).json({status: true,data:student, token:token})

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    
    }
}



export const loginStudent =async(req,res)=>{
try {
     let loginData=req.body
    let {email, password} = loginData

    let student = await Student.findOne({email}).select("password")
    if(! student) {
        return res.status(404).json({status:false,message:"No such student "})
    }
    console.log(password,  student.password)
let validPassword = await bcrypt.compare(password,  student.password)
let token = jwt.sign({_id: student._id}, process.env.JWT_SECRET)

const options = {
  httpOnly:true,
  expires: new Date(Date.now()+10*24*60*60*1000)
}

return res.status(200).cookie("token",token, options).send({status:true,data:{studentId: student._id, token}})
} catch (error) {
    
    return res.status(500).json({
        success:false,
        message:error.message
    })

}

}


export const getAllStudent = async (req,res)=>{

    try {
        const student = await Student.find();
  if (!student) {
    return res.status(404).json({status:false,message:"No such student "})
  }

    return res.status(200).json({status:true,student:`${student.length}`,data:student})
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const deleteStudent= async (req,res)=>{
    try {
        const studentId = await Student.findOne(req.student._id);
  
        console.log(studentId)

  const deleteDoc = await Student.findByIdAndDelete(studentId);
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  return res.status(200).json({status:true,message:"deleted successfully"})

} catch (error) {
        return res.status(500).send({ success:false,message:error.message });
    }
}