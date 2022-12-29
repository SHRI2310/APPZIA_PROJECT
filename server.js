import {app} from  "./app.js";
import { config } from "dotenv";
import { connectDatabase } from "./config/database.js";
import mongoose from "mongoose";

config({
    path:"./config/config.env"
})

mongoose.set("strictQuery", true) // * handles depriciation query of mongoose 
connectDatabase()
app.listen(process.env.PORT,()=>{
    console.log("Server is runnning on port " + process.env.PORT)
}) 

