
 import express  from "express";
import { registerStudent ,loginStudent, getAllStudent, deleteStudent, logutStudent,updateStudent, studentById } from "../controllers/studentController.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.route("/register").post(registerStudent)
router.route("/login").post(loginStudent)
router.route("/logout").get(logutStudent)
router.route("/getStudent").get(getAllStudent)
router.route("/deleteStudent").delete(isAuthenticated,deleteStudent)
router.route("/update").post(isAuthenticated,updateStudent)
router.route("/getSingleStudent/:id").get(studentById)


export default router