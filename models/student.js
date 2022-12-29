import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
name:{
    type:String,
    required: [true,"Please Provide name"],
    trim:true

},
DOB:{
    type:String,
    required:[true,"Please provide DOB"],
    trim:true
},
image:{
type:String,
required:[true,"please provide image "]
},
contact:{
    type:String,
    required:[true,"please Provide Contact No"],
    trim:true

},
email:{
    type:String,
    required:[true,"Please provide Email"],
    unique:  true,
    trim:true
},
password:{
    type:String,
    required:[true,"Please provide Password"],
   minLength:[8,"Password must have minimum  8 characters "],
   trim:true,
   select:false
}
})

export default mongoose.model("Student",studentSchema)