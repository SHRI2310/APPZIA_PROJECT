
 import express  from "express";
import { registerStudent ,loginStudent, getAllStudent, deleteStudent } from "../controllers/studentController.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.route("/register").post(registerStudent)
// router.route("/verify").post(isAuthenticated, verify)
router.route("/login").post(loginStudent)
// router.route("/logout").get(logout)
router.route("/getStudent").get(getAllStudent)
router.route("/deleteStudent").delete(isAuthenticated,deleteStudent)


export default router