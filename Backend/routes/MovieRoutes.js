import express from "express";
import { Router } from "express";
import { createMovies, getMovies, getMoviesById, updateMoviesById, deleteMoviesById } from "../controller/MovieController.js";
import { auth } from "../middleware/auth.js";
const router = express.Router()


router.post("/", auth, createMovies);
router.get("/", getMovies);
router.get("/:id", getMoviesById);
router.put("/:id", auth, updateMoviesById);
router.delete("/:id", auth, deleteMoviesById);

export default router;