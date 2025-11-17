import express from "express";
import { createUser, loginUser } from "../controller/userController.js";
import { auth } from "../middleware/auth.js";
const route = express.Router();

route.post("/register", createUser)
route.post("/login",loginUser)

export default route;