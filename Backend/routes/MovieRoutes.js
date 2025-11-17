import express from "express";
import { Router } from "express";
import { createMovies, getMovies, getMoviesById, updateMoviesById, deleteMoviesById } from "../controller/MovieController.js";
import { createUser, loginUser } from "../controller/userController.js";
import { auth } from "../middleware/auth.js";
const router = express.Router()


router.post("/", auth, createMovies);
router.get("/", getMovies);
router.get("/:id", getMoviesById);
router.put("/:id", auth, updateMoviesById);
router.delete("/:id", auth, deleteMoviesById);
router.post("/register", createUser)
router.post("/login",loginUser)

export default router;