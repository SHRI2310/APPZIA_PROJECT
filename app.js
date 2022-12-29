import  express from "express"; 
import Student from "./routers/route.js"
import cookieParser from "cookie-parser";
import multer from "multer"

export const app = express();
app.use(express.json());

app.use(multer().any())
app.use(express.urlencoded({extended:true})) ;

app.use(cookieParser())

app.use("/api",Student)